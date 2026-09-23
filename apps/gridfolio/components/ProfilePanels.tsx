"use client";

import { FormEvent, useState } from "react";
import { asset } from "../lib/assets";
import styles from "./ProfilePanels.module.css";

const aboutPhotos = [
  { file: "DokGnQgPJ0Q22yDy9mAddewtoA.png", rotation: -10 },
  { file: "lgcx9rsoGQgMvweb6NeDkS4iRM.png", rotation: 9 },
  { file: "nzLFf3c04T1OdF1pT9GIMD68mc.png", rotation: -8 },
  { file: "apSEs3JaCgKa8ovIfrd5RCUQEs.png", rotation: 9 },
] as const;

const experience = [
  ["Principal product design at Glloo inc", "2024 - Now"],
  ["Product design at Pinc", "2020 - 2024"],
  ["Product design at one time", "2018 - 2020"],
  ["Junior product designer at Glance", "2017 - 2018"],
] as const;

const projects = ["Selver AI", "Cost calculator", "Video transcript AI"] as const;

function Signature() {
  return (
    <svg
      aria-label="Antonio Misk's signature"
      className={styles.signature}
      role="img"
      viewBox="0 0 179.751 46.293"
    >
      <path d="M 25.517 40.048 C 25.601 39.632 25.809 37.553 25.933 35.89 C 24.27 30.567 18.282 26.699 12.169 24.454 C 7.345 32.521 3.27 40.422 1.107 45.413 C 0.483 46.868 -0.224 46.244 0.068 45.496 C 2.687 39.383 5.182 34.268 11.212 24.121 C 10.588 23.872 9.923 23.705 9.299 23.497 C 8.052 22.874 8.343 20.794 13.25 20.711 L 14.414 18.84 C 22.399 5.658 30.549 -0.123 31.714 0.002 C 32.878 0.127 33.502 0.875 33.252 2.123 C 33.044 3.37 31.007 11.188 29.052 21.127 C 32.92 21.252 35.997 21.418 36.246 21.418 C 37.369 21.585 37.12 22.333 35.789 22.208 C 33.491 22.041 31.189 21.944 28.886 21.917 C 27.389 29.694 27.222 30.65 26.848 35.183 C 26.8 35.472 26.772 35.763 26.765 36.056 C 27.222 38.884 27.181 38.634 27.098 39.175 C 27.056 39.799 26.266 40.464 25.975 40.422 C 25.684 40.381 25.393 40.464 25.517 40.048 Z M 14.456 20.711 C 17.658 20.711 23.397 20.878 28.22 21.085 C 30.258 10.481 32.462 2.871 32.545 2.123 C 32.628 1.416 32.712 0.751 31.963 0.667 C 31.173 0.584 21.109 10.19 15.329 19.339 Z M 12.543 23.83 C 16.826 25.577 23.521 28.696 26.141 33.894 C 26.432 30.858 26.557 29.652 28.054 21.876 C 23.286 21.812 18.517 21.812 13.749 21.876 Z M 9.882 22.79 C 10.339 22.998 10.963 23.206 11.628 23.456 L 12.543 21.917 C 9.632 22.125 9.549 22.707 9.882 22.79 Z M 36.787 21.46 C 36.995 21.46 37.12 21.543 37.078 21.917 C 36.995 22.707 36.496 24.163 36.371 24.495 C 36.329 24.579 36.371 24.662 36.496 24.662 C 36.621 24.662 37.827 24.08 38.658 23.664 C 39.864 23.04 40.696 22.583 41.361 22.583 C 41.943 22.583 42.484 23.082 42.484 23.913 C 42.359 25.078 42.359 25.701 42.775 25.743 C 45.852 26.408 51.217 13.143 53.504 6.323 C 53.629 5.949 54.128 6.032 53.92 6.489 C 52.298 11.105 50.344 17.384 47.932 21.585 C 46.102 24.745 43.981 26.866 42.276 26.533 C 41.403 26.367 41.237 25.577 41.361 24.412 C 41.361 23.789 41.361 23.539 41.195 23.456 C 40.987 23.331 40.53 23.497 39.739 23.913 C 39.074 24.246 36.787 25.41 36.413 25.41 C 36.163 25.41 35.415 25.119 35.415 24.787 C 35.415 24.579 35.955 23.165 36.163 21.834 C 36.288 21.501 36.537 21.501 36.787 21.46 Z M 50.136 37.47 C 49.595 37.595 49.221 35.931 49.262 32.854 C 49.346 30.317 49.969 21.585 51.217 14.889 C 51.508 13.351 51.799 11.978 52.09 10.731 C 43.981 10.731 43.233 10.772 43.066 10.149 C 42.983 9.774 44.147 9.275 44.48 9.483 C 44.896 9.733 45.187 9.858 46.393 9.858 L 52.298 9.899 C 53.629 4.576 54.876 2.414 55.459 2.414 C 55.791 2.414 56.041 3.412 55.958 3.786 C 55.833 4.285 55.666 3.578 55.209 4.576 C 55.126 4.701 54.253 6.988 53.462 9.899 C 54.918 9.899 55.459 10.024 59.575 10.024 C 63.401 10.024 64.399 9.816 64.524 10.273 C 64.607 10.772 62.57 10.731 59.451 10.731 L 53.213 10.731 C 52.839 12.228 52.464 13.808 52.215 15.347 C 51.606 18.672 51.093 22.014 50.676 25.369 C 50.344 27.739 49.928 33.644 50.177 35.64 C 50.385 37.22 50.718 37.387 50.136 37.47 Z M 57.264 21.876 C 56.655 22.293 56.272 22.968 56.224 23.705 C 56.266 24.08 56.432 24.662 56.973 24.62 C 57.971 24.537 58.761 23.414 58.719 22.291 C 58.719 22.125 58.678 21.959 58.678 21.834 C 57.43 21.792 57.181 21.127 57.597 20.586 C 57.929 20.254 58.553 20.462 58.927 21.085 C 60.965 20.794 66.288 18.216 67.702 18.382 C 68.741 18.466 68.658 19.256 68.617 19.838 C 68.492 20.794 67.244 23.664 67.369 23.789 C 67.452 23.913 70.322 21.293 71.153 21.377 C 71.694 21.418 71.361 23.248 71.278 24.62 C 71.237 25.327 71.278 25.868 71.486 25.993 C 71.694 26.159 72.068 26.034 72.359 25.743 C 72.609 25.493 72.734 25.701 72.567 26.034 C 72.401 26.408 71.777 27.115 71.153 26.907 C 70.571 26.699 70.322 25.66 70.405 24.662 C 70.488 23.705 70.738 22.624 70.53 22.583 C 69.989 22.458 67.619 25.286 66.953 25.161 C 66.745 25.161 66.371 24.204 66.413 23.83 C 66.454 23.456 67.827 20.254 67.868 19.588 C 67.91 19.214 67.951 19.006 67.577 18.965 C 66.621 18.881 61.007 21.543 59.177 21.834 C 59.228 21.981 59.256 22.136 59.26 22.291 C 59.302 23.789 58.262 25.327 56.848 25.327 C 55.892 25.369 55.268 24.662 55.351 23.539 C 55.419 22.71 55.844 21.951 56.515 21.46 C 56.682 21.335 57.555 21.668 57.264 21.876 Z M 88.775 21.46 C 88.983 21.46 89.149 21.876 88.941 21.959 C 88.439 22.084 86.446 23.206 81.664 24.828 C 77.88 26.117 76.923 26.325 76.258 26.325 C 75.173 26.325 74.841 25.577 74.841 24.911 C 74.841 24.288 75.007 23.206 75.256 22.499 C 75.426 21.917 75.634 21.585 76.341 21.46 C 76.549 21.418 76.795 21.668 76.549 22.125 C 75.925 23.414 75.8 24.204 75.717 24.87 C 75.672 25.369 75.88 25.618 76.088 25.618 C 76.629 25.618 77.793 25.493 81.328 24.246 C 85.403 22.79 88.522 21.46 88.771 21.46 Z M 77.173 18.507 C 76.965 18.424 76.798 17.717 76.882 17.426 C 76.961 17.177 77.298 16.719 77.547 16.761 C 77.918 16.844 78.171 17.343 78.084 17.717 C 77.959 18.091 77.419 18.549 77.169 18.507 Z M 85.725 24.994 C 86.058 24.288 86.474 23.664 86.852 23.165 C 86.644 22.957 86.436 22.749 86.311 22.458 C 85.563 20.878 86.935 19.006 88.761 19.006 C 90.591 19.006 91.714 20.711 91.714 23.331 L 91.714 23.456 C 91.88 23.456 92.046 23.456 92.254 23.414 C 94.333 23.248 98.201 22.25 99.947 21.626 C 100.242 21.501 100.45 21.959 100.242 22.042 C 99.327 22.416 94.583 23.955 92.133 24.163 C 91.963 24.204 91.8 24.204 91.672 24.204 C 91.298 28.197 88.345 31.44 86.432 31.44 C 84.561 31.44 84.065 28.238 85.725 24.994 Z M 86.269 30.692 C 88.141 30.692 90.386 27.864 90.761 24.204 C 89.634 24.204 88.432 24.038 87.559 23.622 C 87.193 24.113 86.859 24.627 86.561 25.161 C 84.98 28.238 85.476 30.692 86.269 30.692 Z M 89.052 21.792 C 89.052 21.876 88.598 22.291 88.054 22.957 C 88.803 23.289 89.804 23.456 90.844 23.456 L 90.844 23.04 C 90.844 20.878 89.804 19.713 88.636 19.713 C 87.517 19.713 86.477 20.794 87.056 22.042 C 87.139 22.25 87.264 22.375 87.389 22.541 C 88.013 21.876 88.557 21.501 88.678 21.501 C 88.931 21.501 89.052 21.626 89.052 21.792 Z M 133.593 41.92 C 133.468 42.377 132.886 42.543 133.052 41.795 C 133.219 41.046 136.92 27.448 138.375 18.923 C 139.831 10.357 141.12 2.747 139.623 2.747 C 138.167 2.747 134.05 5.99 127.522 14.889 C 120.993 23.872 119.205 28.113 118.207 28.113 C 116.418 28.113 117.749 23.373 118.207 17.634 C 118.622 12.561 119.579 6.281 117.999 6.281 C 116.626 6.281 112.801 11.355 110.929 18.757 C 109.266 25.452 109.058 31.107 110.098 32.272 C 110.805 33.104 110.222 33.395 109.599 32.646 C 108.268 30.941 108.476 24.288 110.014 18.466 C 111.678 12.436 115.504 5.45 117.874 5.45 C 120.452 5.45 119.246 14.723 118.955 17.634 C 118.622 20.961 117.375 27.198 118.248 27.198 C 118.331 27.198 121.908 20.628 126.648 14.432 C 131.393 8.153 136.837 1.582 139.581 1.582 C 142.076 1.582 141.328 8.194 139.457 18.923 C 137.668 29.319 134.425 38.925 133.593 41.92 Z M 146.02 25.161 C 148.307 25.161 152.715 21.127 155.127 18.424 C 155.169 16.761 156.375 15.555 157.414 15.388 C 158.371 15.305 158.287 15.804 157.913 16.054 C 157.759 16.171 157.592 16.269 157.414 16.345 L 157.331 16.428 C 157.04 16.719 155.668 17.967 155.959 19.089 C 156.167 19.921 157.04 21.585 157.83 23.581 C 159.577 22.167 161.406 21.044 162.903 20.42 C 163.07 20.337 163.527 20.295 163.735 20.462 C 163.943 20.586 163.652 20.711 163.402 20.794 C 162.113 21.252 160.076 22.624 158.08 24.329 C 158.745 26.117 159.327 28.155 159.327 30.109 C 159.327 34.476 155.626 37.096 153.214 37.096 C 149.804 37.096 148.972 32.854 154.254 26.991 C 155.127 25.993 156.083 25.036 157.082 24.163 C 156.375 22.416 155.584 20.794 155.293 19.588 L 155.169 19.048 C 152.635 22.333 148.64 25.868 146.145 25.868 C 145.105 25.868 144.772 25.119 144.772 24.495 C 144.772 23.872 144.939 23.165 145.147 22.458 C 145.355 21.917 145.521 21.585 146.228 21.46 C 146.436 21.418 146.727 21.543 146.477 22.042 C 145.854 23.289 145.729 23.747 145.646 24.412 C 145.604 24.911 145.77 25.161 146.02 25.161 Z M 158.537 29.527 C 158.537 28.113 157.996 26.492 157.373 24.911 C 156.499 25.66 155.709 26.533 154.961 27.323 C 150.345 32.604 151.052 36.43 152.798 36.43 C 155.46 36.43 158.537 33.395 158.537 29.527 Z M 147.101 18.466 C 146.852 18.382 146.727 17.676 146.81 17.426 C 146.893 17.135 147.226 16.678 147.475 16.719 C 147.808 16.802 148.099 17.301 147.974 17.676 C 147.85 18.05 147.309 18.549 147.101 18.466 Z M 172.135 18.923 C 171.927 18.923 171.803 18.757 171.719 18.757 C 171.636 18.757 169.307 19.963 167.935 20.753 C 167.062 21.293 166.105 21.834 165.606 22.291 C 165.531 22.578 165.475 22.87 165.44 23.165 C 166.23 23.456 168.725 23.331 170.597 23.165 C 173.216 22.915 176.626 22.375 179.329 21.709 C 179.953 21.585 179.787 22.333 179.454 22.416 C 177.167 23.165 173.383 23.705 170.638 23.996 C 168.476 24.204 166.521 24.246 165.274 24.08 L 164.858 26.45 C 164.234 30.234 164.608 31.357 164.151 31.357 C 163.652 31.357 163.735 29.319 164.068 26.2 C 164.151 25.452 164.234 24.703 164.359 23.913 C 163.985 23.789 163.777 23.622 163.694 23.456 C 163.569 23.082 163.818 22.541 164.692 21.792 C 165.024 19.63 165.565 16.885 166.48 13.018 C 168.517 4.036 169.515 1.832 170.222 1.832 C 170.555 1.832 170.68 2.788 170.555 3.162 C 170.43 3.661 169.89 4.535 169.432 5.533 C 169.307 5.741 168.226 9.858 167.436 13.559 C 166.854 16.137 166.355 18.632 165.898 20.878 C 166.105 20.711 166.355 20.545 166.646 20.379 C 168.808 18.965 171.761 17.592 172.01 17.592 C 172.302 17.592 172.634 18.091 172.634 18.299 C 172.634 18.507 172.468 18.923 172.135 18.923 Z" />
    </svg>
  );
}

export function AboutPanel() {
  return (
    <section className={`${styles.panel} ${styles.aboutPanel}`} aria-labelledby="about-title">
      <div className={styles.aboutContent}>
        <div className={styles.photoCollage} aria-label="Photos of Antonio Misk" role="img">
          {aboutPhotos.map(({ file, rotation }) => (
            <div
              className={styles.photoCard}
              key={file}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <img src={asset(file)} alt="" />
            </div>
          ))}
        </div>

        <div className={styles.aboutCopy}>
          <div>
            <h1 className={styles.aboutTitle} id="about-title">Antonio Misk</h1>
            <p className={styles.aboutRole}>Lead product designer</p>
          </div>
          <div className={styles.bio}>
            <p>I’m a multidisciplinary product designer working at the intersection of product, design, and angineering. I enjoy turning complex ideas into simple, thoughtful digital experiences.</p>
            <p>Outside of work, I like experimenting with new tools, listening to music while designing, and building small side projects for fun.</p>
            <p>Fun fact: I tend to obsess over tiny design details most people never notice but I think they matter.</p>
          </div>
        </div>
        <Signature />
      </div>
    </section>
  );
}

function ResumeRow({ label, meta }: { label: string; meta: string }) {
  return (
    <div className={styles.resumeRow}>
      <span>{label}</span>
      <span className={styles.resumeMeta}>{meta}</span>
    </div>
  );
}

export function ResumePanel() {
  return (
    <section className={`${styles.panel} ${styles.standardPanel}`} aria-labelledby="resume-title">
      <h2 className={styles.panelTitle} id="resume-title">My resume</h2>

      <div className={styles.resumeContent}>
        <section className={styles.resumeSection} aria-labelledby="experience-title">
          <h3 className={styles.sectionTitle} id="experience-title">EXPERIENCE</h3>
          <div className={styles.experienceList}>
            {experience.map(([label, meta], index) => (
              <div className={styles.rowGroup} key={label}>
                <ResumeRow label={label} meta={meta} />
                {index < experience.length - 1 && <div className={styles.divider} />}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.resumeSection} aria-labelledby="education-title">
          <h3 className={styles.sectionTitle} id="education-title">EDUCATION</h3>
          <ResumeRow label="Principal product design at Glloo inc" meta="2016" />
        </section>

        <section className={styles.resumeSection} aria-labelledby="projects-title">
          <h3 className={styles.sectionTitle} id="projects-title">PROJECTS</h3>
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <div className={styles.rowGroup} key={project}>
                <div className={styles.resumeRow}>
                  <span>{project}</span>
                  <span aria-disabled="true" aria-label={`View ${project}, unavailable in this preview`} className={styles.resumeMeta} role="link">View</span>
                </div>
                {index < projects.length - 1 && <div className={styles.divider} />}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.downloadRow}>
        <button aria-label="Download CV, unavailable in this preview" className={styles.downloadButton} disabled type="button">Download CV</button>
      </div>
    </section>
  );
}

export function ContactPanel() {
  const [isValid, setIsValid] = useState(false);
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Preview only. No message has been sent.");
  }

  return (
    <section className={`${styles.panel} ${styles.standardPanel} ${styles.contactPanel}`} aria-labelledby="contact-title">
      <h2 className={styles.panelTitle} id="contact-title">Let&apos;s have a chat</h2>
      <form
        className={styles.contactForm}
        onChange={(event) => setIsValid(event.currentTarget.checkValidity())}
        onSubmit={handleSubmit}
      >
        <div className={styles.fields}>
          <label className={styles.field}>
            <span>Name</span>
            <input name="Name" placeholder="Jane Smith" required type="text" />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input name="Email" placeholder="jane@gmail.com" type="email" />
          </label>
          <label className={styles.field}>
            <span>Message</span>
            <textarea name="Message" placeholder="Type your message here" required />
          </label>
        </div>
        <button className={`${styles.sendButton} ${isValid ? styles.sendButtonReady : ""}`} type="submit">Send message</button>
        {status && <p className={styles.formStatus} role="status">{status}</p>}
      </form>
    </section>
  );
}
