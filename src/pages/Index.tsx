import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const services = [
  {
    title: 'Женская стрижка',
    description: 'Современные стрижки от лучших мастеров',
    price: 'от 2500 ₽',
    icon: 'Scissors'
  },
  {
    title: 'Мужская стрижка',
    description: 'Классика и современные тренды',
    price: 'от 1500 ₽',
    icon: 'User'
  },
  {
    title: 'Окрашивание',
    description: 'Профессиональные красители премиум-класса',
    price: 'от 3500 ₽',
    icon: 'Palette'
  },
  {
    title: 'Укладка',
    description: 'Вечерние и повседневные укладки',
    price: 'от 1800 ₽',
    icon: 'Wind'
  },
  {
    title: 'Уход за волосами',
    description: 'Восстановление и лечение волос',
    price: 'от 2000 ₽',
    icon: 'Sparkles'
  },
  {
    title: 'Свадебные прически',
    description: 'Создание образа для особого дня',
    price: 'от 5000 ₽',
    icon: 'Heart'
  }
];

const masters = [
  {
    name: 'Анна Смирнова',
    position: 'Топ-стилист',
    specialization: 'Окрашивание, стрижки',
    experience: '12 лет опыта',
    image: '/placeholder.svg'
  },
  {
    name: 'Елена Волкова',
    position: 'Мастер-колорист',
    specialization: 'Сложное окрашивание',
    experience: '8 лет опыта',
    image: '/placeholder.svg'
  },
  {
    name: 'Мария Петрова',
    position: 'Стилист',
    specialization: 'Стрижки, укладки',
    experience: '10 лет опыта',
    image: '/placeholder.svg'
  }
];

const reviews = [
  {
    name: 'Ольга К.',
    rating: 5,
    text: 'Потрясающий салон! Анна создала для меня идеальный цвет волос. Профессионализм на высшем уровне!',
    date: '15 октября 2024'
  },
  {
    name: 'Татьяна М.',
    rating: 5,
    text: 'Ходила к Елене на окрашивание - результат превзошел все ожидания. Волосы живые, цвет насыщенный!',
    date: '8 октября 2024'
  },
  {
    name: 'Александра П.',
    rating: 5,
    text: 'Мария сделала мне потрясающую стрижку! Теперь только к ней. Рекомендую всем!',
    date: '3 октября 2024'
  }
];

const portfolio = [
  { id: 1, category: 'Окрашивание', image: 'https://cdn.poehali.dev/projects/48fd08e2-b245-4711-b3f7-8a59a236ce44/files/e0e46231-1689-491d-b4a0-51171fbca627.jpg' },
  { id: 2, category: 'Стрижка', image: 'https://cdn.poehali.dev/projects/48fd08e2-b245-4711-b3f7-8a59a236ce44/files/e0774793-1ed9-4616-ad2d-5db918dd89e4.jpg' },
  { id: 3, category: 'Укладка', image: 'https://cdn.poehali.dev/projects/48fd08e2-b245-4711-b3f7-8a59a236ce44/files/fd8dc5fb-fc32-4372-a22c-11e66ee6c7ab.jpg' },
  { id: 4, category: 'Окрашивание', image: 'https://cdn.poehali.dev/projects/48fd08e2-b245-4711-b3f7-8a59a236ce44/files/e0e46231-1689-491d-b4a0-51171fbca627.jpg' },
  { id: 5, category: 'Стрижка', image: 'https://cdn.poehali.dev/projects/48fd08e2-b245-4711-b3f7-8a59a236ce44/files/e0774793-1ed9-4616-ad2d-5db918dd89e4.jpg' },
  { id: 6, category: 'Укладка', image: 'https://cdn.poehali.dev/projects/48fd08e2-b245-4711-b3f7-8a59a236ce44/files/fd8dc5fb-fc32-4372-a22c-11e66ee6c7ab.jpg' }
];

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    master: '',
    date: '',
    time: '',
    message: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения записи.",
    });
    setFormData({
      name: '',
      phone: '',
      service: '',
      master: '',
      date: '',
      time: '',
      message: ''
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-accent">SALON</h1>
          <div className="hidden md:flex gap-6">
            {['services', 'masters', 'portfolio', 'reviews', 'booking', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {section === 'services' && 'Услуги'}
                {section === 'masters' && 'Мастера'}
                {section === 'portfolio' && 'Портфолио'}
                {section === 'reviews' && 'Отзывы'}
                {section === 'booking' && 'Запись'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </div>
          <Button onClick={() => scrollToSection('booking')} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Записаться
          </Button>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-10" />
        <div className="relative z-20 text-center px-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Создавая
            <span className="block text-accent">Красоту</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Премиальный салон красоты в центре города. Профессиональный уход за вашими волосами.
          </p>
          <Button 
            size="lg" 
            onClick={() => scrollToSection('booking')}
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6"
          >
            Записаться на процедуру
          </Button>
        </div>
      </section>

      <section id="services" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg">Полный спектр парикмахерских услуг</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="bg-card border-border hover:border-accent transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="text-accent" size={24} />
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-accent">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="masters" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-4">Наши мастера</h2>
            <p className="text-muted-foreground text-lg">Команда профессионалов с многолетним опытом</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {masters.map((master, index) => (
              <Card 
                key={index}
                className="bg-card border-border overflow-hidden group hover:border-accent transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img 
                    src={master.image} 
                    alt={master.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{master.name}</CardTitle>
                  <Badge className="w-fit bg-accent/20 text-accent border-accent/30">{master.position}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{master.specialization}</p>
                  <p className="text-sm text-accent">{master.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-4">Портфолио</h2>
            <p className="text-muted-foreground text-lg">Наши лучшие работы</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {portfolio.map((item, index) => (
              <div 
                key={item.id}
                className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img 
                  src={item.image}
                  alt={item.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Badge className="bg-accent text-accent-foreground">{item.category}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-muted-foreground text-lg">Что говорят о нас</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card 
                key={index}
                className="bg-card border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{review.name}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-24 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-4">Онлайн-запись</h2>
            <p className="text-muted-foreground text-lg">Выберите удобное время и мастера</p>
          </div>
          <Card className="bg-card border-border animate-scale-in">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="bg-input border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Услуга</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service, index) => (
                        <SelectItem key={index} value={service.title}>
                          {service.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="master">Мастер</Label>
                  <Select value={formData.master} onValueChange={(value) => setFormData({ ...formData, master: value })}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Выберите мастера" />
                    </SelectTrigger>
                    <SelectContent>
                      {masters.map((master, index) => (
                        <SelectItem key={index} value={master.name}>
                          {master.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Дата</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Время</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Дополнительные пожелания</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-input border-border min-h-24"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg"
                >
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-4">Контакты</h2>
            <p className="text-muted-foreground text-lg">Мы всегда рады вам помочь</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card border-border text-center animate-fade-in">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" className="text-accent" size={24} />
                </div>
                <CardTitle className="text-xl">Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 10</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" className="text-accent" size={24} />
                </div>
                <CardTitle className="text-xl">Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+7 (999) 123-45-67</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" className="text-accent" size={24} />
                </div>
                <CardTitle className="text-xl">Часы работы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Ежедневно: 10:00 - 21:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">&copy; 2024 SALON. Все права защищены.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Facebook" size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
              <Icon name="Phone" size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;