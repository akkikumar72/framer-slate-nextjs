"use client";

import { useState } from "react";
import styles from "./Blog.module.css";

export function ArticleVideo() {
  const [playing, setPlaying] = useState(false);
  return <div className={styles.video}>{playing ? <iframe allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen src="https://www.youtube.com/embed/smPos0mJvh8?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=1" title="Youtube Video" /> : <button aria-label="Play" onClick={() => setPlaying(true)} type="button"><img alt="" src="/b2bizz/assets/youtube-smPos0mJvh8.webp" /><svg aria-hidden="true" viewBox="0 0 68 48"><path d="M66.52,7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55C3.97,2.33,2.27,4.81,1.48,7.74C.06,13.05,0,24,0,24s.06,10.95,1.48,16.26c.78,2.93,2.49,5.41,5.42,6.19C12.21,47.87,34,48,34,48s21.79-.13,27.1-1.55c2.93-.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24s-.06-10.95-1.48-16.26z" fill="#212121" fillOpacity=".8" /><path d="M45 24 27 14v20" fill="#fff" /></svg></button>}</div>;
}
