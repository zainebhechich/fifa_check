// Global audio manager that persists across all page navigations
class GlobalAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private initialized: boolean = false;

  constructor() {
    // Delay initialization to ensure DOM is ready
    if (typeof window !== 'undefined') {
      // Use setTimeout to ensure this runs after Next.js hydration
      setTimeout(() => this.init(), 100);
    }
  }

  private init() {
    if (this.initialized) return;
    
    this.audio = new Audio('/spirit.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.3;
    this.audio.preload = 'auto';
    
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.notifyListeners(true);
    });
    
    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notifyListeners(false);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.notifyListeners(false);
    });

    this.initialized = true;
    this.attemptAutoplay();
  }

  private async attemptAutoplay() {
    if (!this.audio) return;

    try {
      await this.audio.play();
    } catch {
      console.log('Autoplay prevented, waiting for user interaction');
      this.setupUserInteractionListeners();
    }
  }

  private setupUserInteractionListeners() {
    const startOnInteraction = async () => {
      if (this.audio && !this.isPlaying) {
        try {
          await this.audio.play();
          this.removeInteractionListeners();
        } catch {
          console.log('Failed to start audio after interaction');
        }
      }
    };

    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    
    events.forEach(event => {
      document.addEventListener(event, startOnInteraction, { once: true });
    });

    // Store cleanup function
    this.removeInteractionListeners = () => {
      events.forEach(event => {
        document.removeEventListener(event, startOnInteraction);
      });
    };
  }

  private removeInteractionListeners = () => {};

  private notifyListeners(playing: boolean) {
    this.listeners.forEach(listener => listener(playing));
  }

  public addListener(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    // Immediately notify with current state
    listener(this.isPlaying);
  }

  public removeListener(listener: (playing: boolean) => void) {
    this.listeners.delete(listener);
  }

  public async toggle() {
    if (!this.audio) {
      this.init();
      return;
    }

    try {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        await this.audio.play();
      }
    } catch (e) {
      console.log('Toggle failed:', e);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

// Create singleton instance
const globalAudioManager = new GlobalAudioManager();

export default globalAudioManager;
