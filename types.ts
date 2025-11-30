export interface DayChallenge {
  day: number;
  isOpen: boolean;
  content: string; // The fitness activity text
  isAiGenerated: boolean;
}

export interface DayCardProps {
  day: number;
  isOpen: boolean;
  isLocked: boolean;
  onOpen: (day: number) => void;
}

export interface ModalProps {
  day: number | null;
  challenge: DayChallenge | undefined;
  onClose: () => void;
}