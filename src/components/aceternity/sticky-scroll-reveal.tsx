"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const cardLength = content.length;

  // Deep-QA fix: the stock useScroll(container) progress never gets close to 1
  // while the panel is on screen, so the last step could never activate (its
  // image/text stayed on the previous step). Drive the active step from the
  // panel's own scroll ratio instead: step i owns ratio slice i/cardLength.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? el.scrollTop / max : 0;
      setActiveCard(Math.min(cardLength - 1, Math.floor(ratio * cardLength)));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [cardLength]);

  const backgroundColors = [
    "#22402A", // brand leaf
    "#3B2A1E", // brand bark
    "#1C3524", // deep leaf
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #E85D1F, #F0A202)", // citrus to lemon
    "linear-gradient(to bottom right, #F0A202, #47663B)", // lemon to moss
    "linear-gradient(to bottom right, #7A2E35, #E85D1F)", // wine to citrus
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-[2rem] p-6 sm:p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-14">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.45,
                }}
                className="font-display text-3xl font-medium text-cream"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.45,
                }}
                className="mt-6 max-w-sm text-base leading-relaxed text-cream/85"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-24" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
