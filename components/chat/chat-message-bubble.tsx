import { Circle, HStack, Image, RoundedRectangle, Spacer, Text, VStack, ZStack } from '@expo/ui/swift-ui';
import { background, fixedSize, font, foregroundStyle, frame, lineLimit, opacity, padding, shapes } from '@expo/ui/swift-ui/modifiers';
import { ChatImageAttachment, ChatMessageKind, ChatReplyPreview } from '@/constants/chat-data';

interface ChatMessageBubbleProps {
  kind: ChatMessageKind;
  text?: string;
  isUser: boolean;
  replyTo?: ChatReplyPreview;
  image?: ChatImageAttachment;
  accentColor: string;
  colors: {
    text: string;
    secondaryText: string;
    surface: string;
    surfaceElevated: string;
    tintContrast: string;
    glassThin: string;
    card: string;
  };
}

export function ChatMessageBubble({
  kind,
  text,
  isUser,
  replyTo,
  image,
  accentColor,
  colors,
}: ChatMessageBubbleProps) {
  if (kind === 'system') {
    return (
      <HStack spacing={0} alignment="center" modifiers={[frame({ maxWidth: Infinity, alignment: 'center' })]}>
        <Text
          modifiers={[
            font({ size: 12, weight: 'semibold', design: 'rounded' }),
            foregroundStyle(colors.secondaryText),
            padding({ horizontal: 12, vertical: 7 }),
            background(colors.glassThin, shapes.capsule()),
            fixedSize({ horizontal: true, vertical: false }),
          ]}>
          {text}
        </Text>
      </HStack>
    );
  }

  if (isUser) {
    return (
      <HStack spacing={0} alignment="top" modifiers={[frame({ maxWidth: Infinity, alignment: 'trailing' })]}>
        <Spacer />
        <VStack
          spacing={replyTo ? 8 : 0}
          alignment="leading"
          modifiers={[
            frame({ maxWidth: 312, alignment: 'trailing' }),
            padding({ horizontal: 16, vertical: 12 }),
            background(accentColor, shapes.roundedRectangle({ cornerRadius: 22 })),
          ]}>
          {replyTo ? (
            <VStack
              spacing={4}
              alignment="leading"
              modifiers={[
                frame({ maxWidth: Infinity, alignment: 'leading' }),
                padding({ horizontal: 12, vertical: 10 }),
                background('rgba(255,255,255,0.18)', shapes.roundedRectangle({ cornerRadius: 16 })),
              ]}>
              <Text
                modifiers={[
                  font({ size: 11, weight: 'semibold', design: 'rounded' }),
                  foregroundStyle(colors.tintContrast),
                  opacity(0.94),
                ]}>
                {replyTo.author}
              </Text>
              <Text
                modifiers={[
                  font({ size: 13, weight: 'medium', design: 'rounded' }),
                  foregroundStyle(colors.tintContrast),
                  opacity(0.92),
                  lineLimit(2),
                ]}>
                {replyTo.text}
              </Text>
            </VStack>
          ) : null}

          {text ? (
            <Text
              modifiers={[
                font({ size: 16, weight: 'medium', design: 'rounded' }),
                foregroundStyle(colors.tintContrast),
                fixedSize({ horizontal: false, vertical: true }),
              ]}>
              {text}
            </Text>
          ) : null}
        </VStack>
      </HStack>
    );
  }

  if (kind === 'image' && image) {
    return (
      <HStack spacing={10} alignment="bottom" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
        <AssistantAvatar accentColor={accentColor} colors={colors} label={image.title.slice(0, 1)} />
        <VStack spacing={8} alignment="leading" modifiers={[frame({ maxWidth: 290, alignment: 'leading' })]}>
          <ZStack alignment="bottomLeading" modifiers={[frame({ width: 290, height: 200 })]}>
            <RoundedRectangle
              cornerRadius={24}
              modifiers={[
                frame({ width: 290, height: 200 }),
                foregroundStyle({
                  type: 'linearGradient',
                  colors: image.colors,
                  startPoint: { x: 0, y: 0 },
                  endPoint: { x: 1, y: 1 },
                }),
              ]}
            />
            <RoundedRectangle
              cornerRadius={20}
              modifiers={[
                frame({ width: 278, height: 188 }),
                foregroundStyle({
                  type: 'linearGradient',
                  colors: ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)'],
                  startPoint: { x: 0, y: 0 },
                  endPoint: { x: 1, y: 1 },
                }),
              ]}
            />

            <VStack
              spacing={10}
              alignment="leading"
              modifiers={[
                frame({ maxWidth: Infinity, maxHeight: Infinity, alignment: 'bottomLeading' }),
                padding({ horizontal: 16, bottom: 16 }),
              ]}>
              <HStack
                spacing={6}
                alignment="center"
                modifiers={[
                  padding({ horizontal: 10, vertical: 7 }),
                  background('rgba(255,255,255,0.16)', shapes.capsule()),
                ]}>
                <Image systemName={resolveImageSymbol(image.symbol)} size={12} color="#FFFFFF" />
                <Text
                  modifiers={[
                    font({ size: 11, weight: 'semibold', design: 'rounded' }),
                    foregroundStyle('#FFFFFF'),
                  ]}>
                  Image
                </Text>
              </HStack>

              <VStack spacing={2} alignment="leading">
                <Text
                  modifiers={[
                    font({ size: 18, weight: 'semibold', design: 'rounded' }),
                    foregroundStyle('#FFFFFF'),
                    lineLimit(1),
                  ]}>
                  {image.title}
                </Text>
                {image.subtitle ? (
                  <Text
                    modifiers={[
                      font({ size: 13, weight: 'medium', design: 'rounded' }),
                      foregroundStyle('rgba(255,255,255,0.86)'),
                      lineLimit(2),
                    ]}>
                    {image.subtitle}
                  </Text>
                ) : null}
              </VStack>
            </VStack>
          </ZStack>

          {text ? (
            <Text
              modifiers={[
                font({ size: 15, weight: 'regular', design: 'rounded' }),
                foregroundStyle(colors.text),
                padding({ horizontal: 14, vertical: 12 }),
                background(colors.surfaceElevated, shapes.roundedRectangle({ cornerRadius: 18 })),
                fixedSize({ horizontal: false, vertical: true }),
              ]}>
              {text}
            </Text>
          ) : null}
        </VStack>
      </HStack>
    );
  }

  return (
    <HStack spacing={10} alignment="bottom" modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
      <AssistantAvatar accentColor={accentColor} colors={colors} label={(text ?? 'S').slice(0, 1)} />
      <VStack
        spacing={replyTo ? 8 : 0}
        alignment="leading"
        modifiers={[
          frame({ maxWidth: 300, alignment: 'leading' }),
          padding({ horizontal: 16, vertical: 13 }),
          background(colors.surfaceElevated, shapes.roundedRectangle({ cornerRadius: 22 })),
        ]}>
        {replyTo ? (
          <VStack
            spacing={4}
            alignment="leading"
            modifiers={[
              frame({ maxWidth: Infinity, alignment: 'leading' }),
              padding({ horizontal: 12, vertical: 10 }),
              background(colors.surface, shapes.roundedRectangle({ cornerRadius: 15 })),
            ]}>
            <Text
              modifiers={[
                font({ size: 11, weight: 'semibold', design: 'rounded' }),
                foregroundStyle(accentColor),
              ]}>
              {replyTo.author}
            </Text>
            <Text
              modifiers={[
                font({ size: 13, weight: 'medium', design: 'rounded' }),
                foregroundStyle(colors.secondaryText),
                lineLimit(2),
              ]}>
              {replyTo.text}
            </Text>
          </VStack>
        ) : null}

        {text ? (
          <Text
            modifiers={[
              font({ size: 16, weight: 'regular', design: 'rounded' }),
              foregroundStyle(colors.text),
              fixedSize({ horizontal: false, vertical: true }),
            ]}>
            {text}
          </Text>
        ) : null}
      </VStack>
    </HStack>
  );
}

function AssistantAvatar({
  accentColor,
  colors,
  label,
}: {
  accentColor: string;
  colors: ChatMessageBubbleProps['colors'];
  label: string;
}) {
  return (
    <ZStack alignment="center" modifiers={[frame({ width: 28, height: 28 })]}>
      <Circle
        modifiers={[
          frame({ width: 28, height: 28 }),
          foregroundStyle(colors.card),
        ]}
      />
      <Circle
        modifiers={[
          frame({ width: 24, height: 24 }),
          foregroundStyle(accentColor),
          opacity(0.18),
        ]}
      />
      <Text
        modifiers={[
          font({ size: 11, weight: 'bold', design: 'rounded' }),
          foregroundStyle(colors.text),
        ]}>
        {label}
      </Text>
    </ZStack>
  );
}

function resolveImageSymbol(symbol?: string): 'photo' | 'sparkles.tv' {
  if (symbol === 'sparkles.tv') return 'sparkles.tv';
  return 'photo';
}
