import React from "react";
import { ImClock } from "react-icons/im";
import styles from "./Clock.module.css";

const { clock__wrapper, navbar__clock, clock } = styles;

const Clock = () => {
  return (
    <div className={clock__wrapper}>
      <div
        className={navbar__clock}
        // @click="toggleClock"
      >
        <ImClock />
        {/* <font-awesome-icon v-if="isVisible" :icon="['far', 'clock']" /> */}
        <div class={clock}>{/* {{ currentTime }}  */} time</div>
      </div>
    </div>
  );
};

export default Clock;
