import { useEffect, useState, useRef } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'motion/react';
import React, { JSX } from 'react';

// replace icons with your own if needed
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
  background?: string; // can be a color, gradient, or image URL
  backgroundImage?: string; // optional separate image URL
  link?: string; // URL to redirect when card is clicked
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: 'CryptoBazzar',
    description: 'Marketplace for buying and selling digital assets using Ethereum.',
    id: 1,
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
    backgroundImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))',
    link: 'https://github.com/Ayush04-C/Crypto-Bazaar.git' 
  },
  {
    title: 'FlixClo',
    description: 'A place where you can search for you movies and tv shows and know about them.',
    id: 2,
    icon: <FiCircle className="h-[16px] w-[16px] text-white" />,
    backgroundImage: 'flixclo.png',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    link: 'https://flixclo.netlify.app/'
  },
  {
    title: 'ChainNova',
    description: 'A Dapp for medical record management using blockchain technology.',
    id: 3,
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />,
    backgroundImage: 'chainnova.png',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    link: 'https://github.com/Ayush04-C/ChainNova.git'
  },
  {
    title: 'DomainX',
    description: 'A place where you can search and register domain names using cryptocurrency.',
    id: 4,
    icon: <FiLayout className="h-[16px] w-[16px] text-white" />,
    backgroundImage:'DomainX.jpg',
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    link: 'https://github.com/Ayush04-C/DomainX.git'
  },
  {
    title: 'Projects',
    description: 'You can find more of my projects on GitHub. Visit my GitHub profile for details.',
    id: 5,
    icon: <FiCode className="h-[16px] w-[16px] text-white" />,
    backgroundImage:'GitHub_2.png',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    link: 'https://github.com/Ayush04-C' 
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}: CarouselProps): JSX.Element {
  // Mobile detection (affects layout only, not desktop)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const containerPadding = 16;
  // Measure container to compute full-width cards on mobile
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cw = entry.contentRect.width;
        setContainerWidth(cw);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const computedItemWidth = isMobile && containerWidth
    ? Math.max(220, containerWidth - containerPadding * 3)
    : baseWidth - containerPadding * 2;

  const itemWidth = computedItemWidth;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  // track drag start globally (avoid hook-in-loop)
  const [dragStartX, setDragStartX] = useState(0);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? ({ duration: 0 } as any) : (SPRING_OPTIONS as any);

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0
        }
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'
      }`}
      style={{
        marginBottom: '50px',
        width: isMobile ? '100%' : `${baseWidth}px`,
        maxWidth: isMobile ? '100%' : `${baseWidth}px`,
        ...(round && { height: `${500}px` })
      }}
    >
      <motion.div
        className="flex"
        drag={isMobile ? false : "x"}
        {...(isMobile ? {} : dragProps)}
        style={{
          width: 'h-screen',
          paddingLeft: `${containerPadding}px`,
          gap: `${GAP}px`,
          perspective: isMobile ? 'none' : 1000,
          perspectiveOrigin: isMobile ? '50% 50%' : `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
          ...(isMobile && { marginLeft: '8px' })
        }}
        onDragEnd={isMobile ? undefined : handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
          // Always call the same hook; flatten rotation on mobile by mapping to 0
          const rotateY = useTransform(x, range, isMobile ? [0, 0, 0] : [90, 0, -90], { clamp: false });

          const handleCardClick = (e: React.MouseEvent | React.TouchEvent) => {
            // Only navigate if user didn't drag (prevent navigation on drag)
            const clientX = 'clientX' in e ? e.clientX : e.changedTouches[0].clientX;
            const dragDistance = Math.abs(clientX - dragStartX);
            if (dragDistance < 10 && item.link) {
              window.open(item.link, '_blank', 'noopener,noreferrer');
            }
          };

          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col p-10 ${
                round
                  ? 'items-center justify-center text-center bg-[#060010] border-0'
                  : 'items-start justify-center border border-[#222] rounded-[12px]'
              } overflow-hidden ${item.link ? 'cursor-pointer' : isMobile ? '' : 'cursor-grab'} ${isMobile ? '' : 'active:cursor-grabbing'}`}
              style={{
                width: itemWidth,
                rotateY: rotateY,
                height: '300px',
                background: item.background || '#222',
                backgroundImage: item.backgroundImage ? `url(${item.backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...(round && { borderRadius: '50%' })
              }}
              transition={effectiveTransition as any}
              onMouseDown={(e) => setDragStartX(e.clientX)}
              onTouchStart={(e) => setDragStartX(e.touches[0].clientX)}
              onClick={handleCardClick}
            >
              {/* Optional overlay for better text readability */}
              {item.backgroundImage && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              )}
              <div className={`${round ? 'p-0 m-0' : 'mb-4 p-5'} relative z-10`}>
              </div>
              <div className="p-5 relative z-10">
                <div className="mb-1 font-black text-lg text-white">{item.title}</div>
                <p className="text-sm text-white">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? round
                    ? 'bg-white'
                    : 'bg-[#333333]'
                  : round
                    ? 'bg-[#555]'
                    : 'bg-[rgba(51,51,51,0.4)]'
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
