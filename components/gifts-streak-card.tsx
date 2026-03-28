import { Button, Circle, HStack, RoundedRectangle, Text, VStack, ZStack } from '@expo/ui/swift-ui';
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

export interface GiftsStreakDay {
  id: string;
  coins: string;
  label: string;
  active?: boolean;
}

interface GiftsStreakCardProps {
  days: GiftsStreakDay[];
  coinBalance: string;
  title: string;
  accentTitle: string;
  subtitle: string;
  footerNote: string;
  bonusCtaLabel: string;
  multiplierLabel: string;
  titleColor: string;
  subtitleColor: string;
}

function GiftsDayBadge({ day }: { day: GiftsStreakDay }) {
  return (
    <VStack
      spacing={8}
      alignment="center"
      modifiers={[
        frame({ minWidth: 38 }),
      ]}>
      <ZStack alignment="center">
        <Circle
          modifiers={[
            frame({ width: 38, height: 38 }),
            foregroundStyle(day.active ? '#FFD449' : '#424A61'),
            ...(day.active
              ? [
                  shadow({ radius: 8, color: 'rgba(255, 212, 73, 0.45)' }),
                ]
              : []),
          ]}
        />
        <Circle
          modifiers={[
            frame({ width: 35, height: 35 }),
            foregroundStyle('#171D2E'),
          ]}
        />
        <Text
          modifiers={[
            font({ size: 14, weight: 'bold', design: 'rounded' }),
            foregroundStyle(day.active ? '#FFD449' : '#707792'),
            fixedSize({ horizontal: true, vertical: true }),
          ]}>
          {day.coins}
        </Text>
      </ZStack>

      <Text
        modifiers={[
          font({ size: 11, weight: 'semibold', design: 'rounded' }),
          foregroundStyle(day.active ? '#F4F4FA' : '#6B7188'),
          lineLimit(1),
          fixedSize({ horizontal: true, vertical: true }),
        ]}>
        {day.label}
      </Text>
    </VStack>
  );
}

export function GiftsStreakCard({
  days,
  coinBalance,
  title,
  accentTitle,
  subtitle,
  footerNote,
  bonusCtaLabel,
  multiplierLabel,
  titleColor,
  subtitleColor,
}: GiftsStreakCardProps) {
  return (
    <VStack spacing={16}>
      <HStack spacing={12} alignment="top">
        <VStack
          spacing={6}
          alignment="leading"
          modifiers={[
            frame({ maxWidth: Infinity, alignment: 'leading' }),
          ]}>
          <HStack spacing={0} alignment="center">
            <Text
              modifiers={[
                font({ size: 25, weight: 'bold', design: 'rounded' }),
                foregroundStyle(titleColor),
                fixedSize({ horizontal: false, vertical: true }),
              ]}>
              {`${title} `}
            </Text>
            <Text
              modifiers={[
                font({ size: 25, weight: 'bold', design: 'rounded' }),
                foregroundStyle('#D44A84'),
                fixedSize({ horizontal: false, vertical: true }),
              ]}>
              {accentTitle}
            </Text>
          </HStack>

          <Text
            modifiers={[
              font({ size: 14, weight: 'medium', design: 'rounded' }),
              foregroundStyle(subtitleColor),
              lineLimit(1),
              fixedSize({ horizontal: false, vertical: true }),
              frame({ maxWidth: Infinity, alignment: 'leading' }),
            ]}>
            {subtitle}
          </Text>
        </VStack>

        <HStack
          spacing={6}
          alignment="center"
          modifiers={[
            padding({ horizontal: 12, vertical: 9 }),
            background('#1C2233', shapes.roundedRectangle({ cornerRadius: 16 })),
          ]}>
          <Text
            modifiers={[
              font({ size: 15, weight: 'bold', design: 'rounded' }),
              foregroundStyle('#FFC93B'),
            ]}>
            {'◕'}
          </Text>
          <Text
            modifiers={[
              font({ size: 15, weight: 'bold', design: 'rounded' }),
              foregroundStyle('#F5F4FB'),
            ]}>
            {coinBalance}
          </Text>
        </HStack>
      </HStack>

      <VStack
        spacing={18}
        modifiers={[
          padding({ top: 18, bottom: 16, leading: 16, trailing: 16 }),
          background('#171D2E', shapes.roundedRectangle({ cornerRadius: 24 })),
          shadow({ radius: 18, y: 10, color: 'rgba(2, 4, 11, 0.22)' }),
        ]}>
        <HStack spacing={8} alignment="top">
          {days.map((day) => (
            <GiftsDayBadge key={day.id} day={day} />
          ))}
        </HStack>

        <Text
          modifiers={[
            font({ size: 12, weight: 'bold', design: 'rounded' }),
            foregroundStyle('#767B92'),
            fixedSize({ horizontal: false, vertical: true }),
          ]}>
          {footerNote}
        </Text>

        <HStack spacing={10} alignment="center">
          <Button
            modifiers={[
              buttonStyle('plain'),
              frame({ maxWidth: Infinity, minHeight: 52 }),
              background('#F8F6F3', shapes.capsule()),
            ]}>
            <Text
              modifiers={[
                font({ size: 17, weight: 'bold', design: 'rounded' }),
                foregroundStyle('#2B2F3E'),
              ]}>
              {bonusCtaLabel}
            </Text>
          </Button>

          <Button
            modifiers={[
              buttonStyle('plain'),
              frame({ width: 58, minHeight: 52 }),
            ]}>
            <ZStack alignment="center">
              <RoundedRectangle
                cornerRadius={20}
                modifiers={[
                  frame({ width: 58, height: 52 }),
                  foregroundStyle('#D14882'),
                ]}
              />
              <Text
                modifiers={[
                  font({ size: 17, weight: 'bold', design: 'rounded' }),
                  foregroundStyle('#FFF7FB'),
                ]}>
                {multiplierLabel}
              </Text>
            </ZStack>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}
