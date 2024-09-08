"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/Heading";

/**
 * Props for `WorkExperience`.
 */
export type WorkExperienceProps = SliceComponentProps<Content.WorkExperienceSlice>;

/**
 * Function to extract text from RichTextField
 */
const extractTextFromRichText = (richText: any[]): string => {
  return richText
    .flatMap(node => node.text || '')
    .join(' ');
}

/**
 * Component for "WorkExperience" Slices.
 */
const WorkExperience = ({ slice }: WorkExperienceProps): JSX.Element => {

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

      // Heading animation
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
            end: "top 75%",
            scrub: 1,
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // List item animation
      gsap.utils.toArray(".list-item").forEach((item, index) => {
        gsap.from(
          item as HTMLElement,
          {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: "top 90%",
              end: "top 75%",
              toggleActions: "play none play reverse",
            },
          }
        );
      });

    }, component);
    return () => ctx.revert();
  }, [slice.primary.work_experience_list]);

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
        <ul className="grid border-b border-b-slate-100">
          {slice.primary.work_experience_list.map(({ name, date, location, description }, index) => {
            const descriptionText = extractTextFromRichText(description);
            const descriptionPoints = descriptionText.split("/").map((point: string) => point.trim());
            return (
              <li key={index} className="list-item opacity-100">
                <div className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold">{name}</span>
                    <span className="text-lg">{date} | {location}</span>
                    <div className="mt-4 text-sm">
                      <ul className="list-disc ml-5">
                        {descriptionPoints.map((point: string, i: number) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

    </section>
  );
};

export default WorkExperience;