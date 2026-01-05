import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  timestamp: Date;
}

interface GeneratorPageProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  images: GeneratedImage[];
  handleGenerate: () => void;
  handleShare: (image: GeneratedImage) => void;
}

export default function GeneratorPage({ 
  prompt, 
  setPrompt, 
  isGenerating, 
  images, 
  handleGenerate, 
  handleShare 
}: GeneratorPageProps) {
  return (
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
  );
}
