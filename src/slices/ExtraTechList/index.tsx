'use client'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Heading from "@/components/Heading";

/**
 * Props for `ExtraTechList`.
 */
export type ExtraTechListProps = SliceComponentProps<Content.ExtraTechListSlice>;

/**
 * Component for "ExtraTechList" Slices.
 */
const ExtraTechList = ({ slice }: ExtraTechListProps): JSX.Element => {

  const component = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Initial animation for the horizontal rule
      gsap.fromTo(
        "hr",
        {
          opacity: 0,
          x: 400,
        },
        {
          opacity: 1,
          x: 0,
          duration: 3,
          scrollTrigger: {
            trigger: "hr",
            start: "top 100%",
            end: "top 75%",
            scrub: 1,
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Heading animation (What I Use)
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
            start: "top 100%",
            end: "top 80%",
            scrub: 1,
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Animate tech-list items
      gsap.utils.toArray(".tech").forEach((item, index) => {
        gsap.fromTo(
          item as HTMLElement,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power1.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: "top 80%",
              end: "top 60%",
              toggleActions: "play none reverse none",
            },
          }
        );
      })
      
    }, component);

    return () => ctx.revert();
  }, [slice.primary.extra_tech_list]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="wrapper overflow-hidden"
      ref={component}
    >
      <hr style={{ marginTop: "100px" }} />
      <div className="mx-auto w-full max-w-7xl mt-10 text-center md:text-left px-4 md-px-0">
        <Heading size="md" className="heading mb-10" as="h2">
          {slice.primary.heading}
        </Heading>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 md-px-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {slice.primary.extra_tech_list.map(({ tech_field, tech_color }, index) => (
            <div
              key={index}
              className="tech p-5 text-3xl"
              style={{
                color: tech_color || "inherit",
                border: tech_color ? `2px solid ${tech_color}` : "none",
              }}
            >
              {tech_field}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraTechList;
