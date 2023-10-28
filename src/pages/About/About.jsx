import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import Flip from "gsap/Flip";
import React, { useEffect } from "react";
import { Page } from "../../components/Page";
import { blue, green, yellow } from "../../utils";
import { Educations, Paragraph, SkillsWrapper, Text } from "./About.styled";
import { AboutItem } from "./AboutItem";
import Skills from "./SkillBall";
import dyp from "../../assets/images/dyp.png";
import highschool from "../../assets/images/highschool.jpeg";
import sos from "../../assets/images/sos.png";
import { useInView } from "react-intersection-observer";
import { useState } from "react";

export const About = () => {
  const { ref, inView } = useInView({});
  const [show, setShow] = useState(inView);
  useEffect(() => {
    setShow(inView);
  }, [inView]);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    let cards = document.querySelectorAll(".about-item");
    cards.forEach((card, i) => {
      if (i === 0) {
        card.classList.add("active");
      }
      card.addEventListener("mouseenter", (e) => {
        if (card.classList.contains("active")) {
          return;
        }
        const state = Flip.getState(cards);
        cards.forEach((c) => {
          c.classList.remove("active");
        });
        card.classList.add("active");
        Flip.from(state, {
          duration: 0.5,
          ease: "elastic.out(1,0.9)",
          absolute: true,
        });
      });
    });
  }, []);
  return (
    <div ref={ref}>
      <Page header="About">
        <Text>
          <Paragraph>
            I'm a passionate programmer, who is always looking for new
            challenges to improve myself, also a team player, who is always
            ready to learn new things and help others.
            <br />I was born and raised in Hyderabad, India. I love to play cricket
            and hit gym and in my free time I like to read books, watch anime
            and play video games.
          </Paragraph>
          <Educations>
            <AboutItem
              color={blue}
              active
              data={{
                title: "Indian Institute of Information Technology and Management, Gwalior",
                p: "Bachelors of Computer Engineering (2020-2024)",
                image: dyp,
              }}
            />
            <AboutItem
              color={green}
              data={{
                title: "Narayana Junior college, Hyderabad",
                p: "High School (2017-2019)" ,
                image: sos,
              }}
            />
            <AboutItem
              color={yellow}
              data={{
                title: "Narayana High school, Hyderabad",
                p: "Secondary Education (2014-2017)",
                image: sos,
              }}
            />
          </Educations>
        </Text>
        <SkillsWrapper>
          {show ? (
            <Canvas camera={{ position: [0, 0, 18] }}>
              <Skills />
            </Canvas>
          ) : (
            `${inView}`
          )}
        </SkillsWrapper>
      </Page>
    </div>
  );
};
