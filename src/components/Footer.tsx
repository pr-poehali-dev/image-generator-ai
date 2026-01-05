import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
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
  );
}
