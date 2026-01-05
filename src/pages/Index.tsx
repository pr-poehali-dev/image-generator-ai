import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  timestamp: Date;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите описание для генерации",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt: prompt,
        url: `https://picsum.photos/seed/${Date.now()}/800/800`,
        timestamp: new Date()
      };
      
      setImages(prev => [newImage, ...prev]);
      setPrompt('');
      
      toast({
        title: "Успешно!",
        description: "Изображение сгенерировано",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сгенерировать изображение",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = (image: GeneratedImage) => {
    if (navigator.share) {
      navigator.share({
        title: 'AI Generated Image',
        text: image.prompt,
        url: image.url
      }).catch(() => {
        handleCopyLink(image);
      });
    } else {
      handleCopyLink(image);
    }
  };

  const handleCopyLink = (image: GeneratedImage) => {
    navigator.clipboard.writeText(image.url);
    toast({
      title: "Скопировано!",
      description: "Ссылка скопирована в буфер обмена",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="glass-effect border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Icon name="Sparkles" size={20} className="text-white" />
            </div>
            <span className="font-heading text-xl font-bold">ImageAI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {[
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'generate', label: 'Генератор', icon: 'Wand2' },
              { id: 'history', label: 'История', icon: 'History' },
              { id: 'profile', label: 'Профиль', icon: 'User' },
              { id: 'settings', label: 'Настройки', icon: 'Settings' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          <Button className="gradient-primary border-0">
            <Icon name="Crown" size={18} className="mr-2" />
            Pro
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
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
        )}

        {activeTab === 'generate' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h1 className="font-heading text-5xl font-bold">Генератор изображений</h1>
              <p className="text-xl text-muted-foreground">
                Опишите, что хотите увидеть, и нейросеть создаст это для вас
              </p>
            </div>

            <Card className="p-8 glass-effect border-0">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Описание изображения</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Например: космический корабль на фоне туманности, реалистичный стиль, 4k..."
                    className="min-h-32 bg-background/50 resize-none"
                    disabled={isGenerating}
                  />
                </div>
                
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full gradient-primary border-0 h-14 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <Icon name="Wand2" size={20} className="mr-2" />
                      Сгенерировать изображение
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {images.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading text-2xl font-bold">Результаты</h2>
                <div className="grid gap-6">
                  {images.map((image) => (
                    <Card key={image.id} className="overflow-hidden glass-effect border-0">
                      <div className="grid md:grid-cols-2 gap-6 p-6">
                        <div className="aspect-square rounded-xl overflow-hidden">
                          <img 
                            src={image.url} 
                            alt={image.prompt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-heading text-xl font-bold mb-2">Промпт</h3>
                            <p className="text-muted-foreground">{image.prompt}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {image.timestamp.toLocaleString('ru-RU')}
                            </p>
                          </div>
                          <div className="flex gap-3 flex-wrap">
                            <Button onClick={() => handleShare(image)} className="gradient-primary border-0">
                              <Icon name="Share2" size={18} className="mr-2" />
                              Поделиться
                            </Button>
                            <Button variant="outline" onClick={() => window.open(image.url, '_blank')}>
                              <Icon name="Download" size={18} className="mr-2" />
                              Скачать
                            </Button>
                            <Button variant="outline" onClick={() => setPrompt(image.prompt)}>
                              <Icon name="Copy" size={18} className="mr-2" />
                              Повторить
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h1 className="font-heading text-5xl font-bold">История генераций</h1>
              <p className="text-xl text-muted-foreground">
                Все ваши созданные изображения в одном месте
              </p>
            </div>

            {images.length === 0 ? (
              <Card className="p-16 text-center glass-effect border-0">
                <Icon name="ImageOff" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-heading text-2xl font-bold mb-2">История пуста</h3>
                <p className="text-muted-foreground mb-6">Создайте первое изображение, чтобы начать</p>
                <Button onClick={() => setActiveTab('generate')} className="gradient-primary border-0">
                  <Icon name="Wand2" size={18} className="mr-2" />
                  Перейти к генератору
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {images.map((image) => (
                  <Card key={image.id} className="group overflow-hidden border-0 glass-effect hover:scale-105 transition-transform">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.prompt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <p className="text-white text-sm line-clamp-2 mb-3">{image.prompt}</p>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleShare(image)} className="flex-1">
                            <Icon name="Share2" size={16} />
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => setPrompt(image.prompt)}>
                            <Icon name="Copy" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4">
                <Icon name="User" size={48} className="text-white" />
              </div>
              <h1 className="font-heading text-4xl font-bold">Мой профиль</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 glass-effect border-0 text-center">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  {images.length}
                </div>
                <p className="text-muted-foreground">Создано изображений</p>
              </Card>
              <Card className="p-6 glass-effect border-0 text-center">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  0
                </div>
                <p className="text-muted-foreground">Публикаций</p>
              </Card>
              <Card className="p-6 glass-effect border-0 text-center">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                  0
                </div>
                <p className="text-muted-foreground">Подписчиков</p>
              </Card>
            </div>

            <Card className="p-8 glass-effect border-0">
              <h2 className="font-heading text-2xl font-bold mb-6">Информация</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя пользователя</label>
                  <Input defaultValue="Creative Artist" className="bg-background/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input defaultValue="artist@example.com" className="bg-background/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">О себе</label>
                  <Textarea 
                    placeholder="Расскажите о себе..." 
                    className="bg-background/50 resize-none"
                    rows={4}
                  />
                </div>
                <Button className="gradient-primary border-0 w-full">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить изменения
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h1 className="font-heading text-4xl font-bold">Настройки</h1>
              <p className="text-xl text-muted-foreground">
                Персонализируйте свой опыт использования
              </p>
            </div>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 glass-effect">
                <TabsTrigger value="general">Общие</TabsTrigger>
                <TabsTrigger value="generation">Генерация</TabsTrigger>
                <TabsTrigger value="privacy">Приватность</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <Card className="p-6 glass-effect border-0">
                  <h3 className="font-heading text-xl font-bold mb-4">Основные настройки</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Тема оформления</p>
                        <p className="text-sm text-muted-foreground">Тёмная тема по умолчанию</p>
                      </div>
                      <Button variant="outline">Изменить</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Язык интерфейса</p>
                        <p className="text-sm text-muted-foreground">Русский</p>
                      </div>
                      <Button variant="outline">Изменить</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="generation" className="space-y-4">
                <Card className="p-6 glass-effect border-0">
                  <h3 className="font-heading text-xl font-bold mb-4">Параметры генерации</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Качество по умолчанию</label>
                      <select className="w-full p-2 rounded-lg bg-background/50 border border-border">
                        <option>Высокое (1024x1024)</option>
                        <option>Среднее (512x512)</option>
                        <option>Низкое (256x256)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Стиль по умолчанию</label>
                      <select className="w-full p-2 rounded-lg bg-background/50 border border-border">
                        <option>Реалистичный</option>
                        <option>Художественный</option>
                        <option>Аниме</option>
                        <option>3D</option>
                      </select>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-4">
                <Card className="p-6 glass-effect border-0">
                  <h3 className="font-heading text-xl font-bold mb-4">Приватность и безопасность</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Публичный профиль</p>
                        <p className="text-sm text-muted-foreground">Другие пользователи могут видеть ваши работы</p>
                      </div>
                      <Button variant="outline">Вкл</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Сохранять историю</p>
                        <p className="text-sm text-muted-foreground">Хранить все генерации в истории</p>
                      </div>
                      <Button variant="outline">Вкл</Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="mt-20 py-12 border-t border-border/50 glass-effect">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            <span className="font-heading text-lg font-bold">ImageAI</span>
          </div>
          <p className="text-muted-foreground">
            Создавай невероятные изображения с помощью искусственного интеллекта
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Twitter" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="Facebook" size={20} />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}