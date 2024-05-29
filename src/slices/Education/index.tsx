'use client'

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Heading from "@/components/Heading";

/**
 * Props for `Education`.
 */
export type EducationProps = SliceComponentProps<Content.EducationSlice>;

/**
 * Component for "Education" Slices.
 */
const Education = ({ slice }: EducationProps): JSX.Element => {

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
              toggleActions: "play none reverse none",
            },
          }
        );
      });


    }, component);
    return () => ctx.revert();
  }, [slice.primary.education_list]);


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

          {slice.primary.education_list.map(({name, marks}, index) => (
            <li key={index} className="list-item opacity-100">
              <div className="flex flex-col justify-between border-t border-t-slate-100 py-10  text-slate-200 md:flex-row">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">{name}</span>
                  <div className="flex gap-3 text-yellow-400">
                    <span className="text-lg font-bold">{marks}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}

        </ul>
      </div>

    </section>
  );
};

export default Education;
