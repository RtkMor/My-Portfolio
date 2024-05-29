"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

gsap.registerPlugin(ScrollTrigger);

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {

  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // heading animation (What I Use)
      gsap.fromTo(
        ".heading",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: ".heading",
            start: "top 95%",
            end: "top 75%",
            scrub: 1,
            toggleActions: "play reverse play reverse"
          },
        }
      );

      // tech-items animation (C++, Java, Javascript, HTML, CSS, React, Bootstrap, GSAP)
      const tl = gsap.timeline({
        scrollTrigger: {
          pin: true,
          start: "top bottom",
          end: "bottom top",
          scrub: 4
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        },
      );

    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="wrapper overflow-hidden"
      ref={component}
      style={{ position: 'relative', zIndex: 8 }} // Ensure it's above Page-2
    >
      <Bounded as="div" className="text-center md:text-left">
        <Heading size="xl" className="heading mb-8" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>

      {slice.primary.repeatable_zone.map(({ tech_color, tech_name }, index) => (
        <div
          key={index}
          className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
          aria-label={tech_name || ""}
        >
          {Array.from({ length: 15 }, (_, index) => (
            <React.Fragment key={index}>
              <span
                className={
                  "tech-item text-5xl md:text-8xl font-extrabold uppercase tracking-tighter"
                }
                style={{
                  color: (index === 7 && tech_color ? tech_color : "inherit")
                }}
              >
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}

    </section>
  );
};

export default TechList;