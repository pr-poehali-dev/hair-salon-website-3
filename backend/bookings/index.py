'''
Business: Handle salon booking submissions and retrieval
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with booking data or confirmation
'''

import json
import os
from typing import Dict, Any, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL environment variable is not set')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            
            name = body_data.get('name')
            phone = body_data.get('phone')
            service = body_data.get('service')
            master = body_data.get('master')
            booking_date = body_data.get('date')
            booking_time = body_data.get('time')
            message = body_data.get('message', '')
            
            if not all([name, phone, service, master, booking_date, booking_time]):
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            conn = get_db_connection()
            cur = conn.cursor()
            
            insert_query = '''
                INSERT INTO bookings (name, phone, service, master, booking_date, booking_time, message, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, name, phone, service, master, booking_date, booking_time, status, created_at
            '''
            
            cur.execute(insert_query, (
                name, phone, service, master, booking_date, booking_time, message, 'pending'
            ))
            
            result = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            booking_result = dict(result)
            booking_result['booking_date'] = str(booking_result['booking_date'])
            booking_result['booking_time'] = str(booking_result['booking_time'])
            booking_result['created_at'] = booking_result['created_at'].isoformat()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'message': 'Booking created successfully',
                    'booking': booking_result
                }),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    if method == 'GET':
        try:
            conn = get_db_connection()
            cur = conn.cursor()
            
            query = 'SELECT id, name, phone, service, master, booking_date, booking_time, message, status, created_at FROM bookings ORDER BY booking_date DESC, booking_time DESC LIMIT 100'
            cur.execute(query)
            
            results = cur.fetchall()
            cur.close()
            conn.close()
            
            bookings = []
            for row in results:
                booking = dict(row)
                booking['booking_date'] = str(booking['booking_date'])
                booking['booking_time'] = str(booking['booking_time'])
                booking['created_at'] = booking['created_at'].isoformat()
                bookings.append(booking)
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'bookings': bookings}),
                'isBase64Encoded': False
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': str(e)}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
