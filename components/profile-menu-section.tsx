import { Button, HStack, Image, Spacer, Text, VStack } from '@expo/ui/swift-ui';
import {
  background,
  buttonStyle,
  fixedSize,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  padding,
  shapes,
  shadow,
} from '@expo/ui/swift-ui/modifiers';

export interface ProfileMenuItem {
  id: string;
  icon: string;
  title: string;
  badgeText?: string;
}

interface ProfileMenuSectionProps {
  items: ProfileMenuItem[];
}

export function ProfileMenuRow({ item }: { item: ProfileMenuItem }) {
  return (
    <Button
      modifiers={[
        buttonStyle('plain'),
        frame({ maxWidth: Infinity, height: 56, alignment: 'leading' }),
      ]}>
      <HStack
        spacing={12}
        alignment="center"
        modifiers={[
          frame({ maxWidth: Infinity, height: 56, alignment: 'leading' }),
          padding({ horizontal: 16 }),
        ]}>
        <Image systemName={item.icon as never} size={17} color="#F2F3F8" />

        <Text
          modifiers={[
            font({ size: 17, weight: 'semibold', design: 'rounded' }),
            foregroundStyle('#F2F3F8'),
            lineLimit(1),
            fixedSize({ horizontal: false, vertical: true }),
          ]}>
          {item.title}
        </Text>

        {item.badgeText ? (
          <Text
            modifiers={[
              font({ size: 12, weight: 'bold', design: 'rounded' }),
              foregroundStyle('#FFF5FA'),
              padding({ horizontal: 10, vertical: 5 }),
              background('#D6538B', shapes.capsule()),
              fixedSize({ horizontal: true, vertical: true }),
            ]}>
            {item.badgeText}
          </Text>
        ) : null}

        <Spacer minLength={8} />

        <Image systemName="chevron.right" size={13} color="#8D95AE" />
      </HStack>
    </Button>
  );
}

export function ProfileMenuSection({ items }: ProfileMenuSectionProps) {
  return (
    <VStack
      spacing={0}
      alignment="leading"
      modifiers={[
        background('#20263A', shapes.roundedRectangle({ cornerRadius: 22 })),
        shadow({ radius: 16, y: 10, color: 'rgba(3, 6, 17, 0.2)' }),
      ]}>
      {items.map((item) => (
        <ProfileMenuRow key={item.id} item={item} />
      ))}
    </VStack>
  );
}
