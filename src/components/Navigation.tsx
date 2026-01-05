import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
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
  );
}
