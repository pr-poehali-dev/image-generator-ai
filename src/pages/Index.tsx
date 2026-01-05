import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/HomePage';
import GeneratorPage from '@/components/GeneratorPage';
import ContentPages from '@/components/ContentPages';
import Footer from '@/components/Footer';

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
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        
        {activeTab === 'generate' && (
          <GeneratorPage
            prompt={prompt}
            setPrompt={setPrompt}
            isGenerating={isGenerating}
            images={images}
            handleGenerate={handleGenerate}
            handleShare={handleShare}
          />
        )}
        
        <ContentPages
          activeTab={activeTab}
          images={images}
          setActiveTab={setActiveTab}
          setPrompt={setPrompt}
          handleShare={handleShare}
        />
      </main>

      <Footer />
    </div>
  );
}