import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  timestamp: Date;
}

interface ContentPagesProps {
  activeTab: string;
  images: GeneratedImage[];
  setActiveTab: (tab: string) => void;
  setPrompt: (prompt: string) => void;
  handleShare: (image: GeneratedImage) => void;
}

export default function ContentPages({ 
  activeTab, 
  images, 
  setActiveTab, 
  setPrompt, 
  handleShare 
}: ContentPagesProps) {
  if (activeTab === 'history') {
    return (
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
    );
  }

  if (activeTab === 'profile') {
    return (
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
    );
  }

  if (activeTab === 'settings') {
    return (
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
    );
  }

  return null;
}
