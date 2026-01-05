import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
}

export default function HomePage({ setActiveTab }: HomePageProps) {
  return (
    <div className="space-y-16 animate-fade-in">
      <section className="text-center py-20 space-y-6">
        <div className="inline-block animate-scale-in">
          <div className="text-6xl mb-6">✨🎨</div>
        </div>
        <h1 className="font-heading text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-slide-up">
          Создавай искусство<br />с помощью AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Превращай текст в потрясающие изображения с помощью передовой нейросети. 
          Делись результатами с друзьями и вдохновляй других.
        </p>
        <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button 
            size="lg" 
            className="gradient-primary border-0 text-lg px-8"
            onClick={() => setActiveTab('generate')}
          >
            <Icon name="Rocket" size={20} className="mr-2" />
            Начать создавать
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8">
            <Icon name="Play" size={20} className="mr-2" />
            Посмотреть демо
          </Button>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-4xl font-bold text-center">Примеры работ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card 
              key={i} 
              className="group overflow-hidden border-0 glass-effect hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${i}/400/400`} 
                  alt={`Example ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm">Пример промпта для изображения #{i}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 space-y-12">
        <h2 className="font-heading text-4xl font-bold text-center">Возможности</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: 'Sparkles',
              title: 'AI Генерация',
              description: 'Мощная нейросеть создаст изображение по вашему описанию за секунды'
            },
            {
              icon: 'Share2',
              title: 'Шеринг',
              description: 'Делитесь результатами в социальных сетях одним кликом'
            },
            {
              icon: 'History',
              title: 'История',
              description: 'Все ваши генерации сохраняются и доступны в любое время'
            }
          ].map((feature, i) => (
            <Card key={i} className="p-8 glass-effect border-0 hover:scale-105 transition-transform">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4">
                <Icon name={feature.icon as any} size={28} className="text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
