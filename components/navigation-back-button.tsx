import { Button, Image } from '@expo/ui/swift-ui';
import { buttonStyle, frame, padding } from '@expo/ui/swift-ui/modifiers';

interface NavigationBackButtonProps {
  color: string;
  onPress?: () => void;
}

export function NavigationBackButton({ color, onPress }: NavigationBackButtonProps) {
  return (
    <Button
      onPress={onPress}
      modifiers={[
        buttonStyle('plain'),
        frame({ width: 44, height: 44 }),
        padding({ horizontal: 6, vertical: 6 }),
      ]}>
      <Image systemName="chevron.left" size={18} color={color} />
    </Button>
  );
}
