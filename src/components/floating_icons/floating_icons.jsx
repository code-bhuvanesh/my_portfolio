import { useEffect, useMemo, useRef } from "react";
import portfolioData from "../../constants";

const parsePercent = (value) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 50;
};

function FloatingIcons() {
  const iconsData = portfolioData.floatingIcons || [];

  // Initialize particles with positions and velocities
  const particlesRef = useRef([]);

  useEffect(() => {
    particlesRef.current = iconsData.map((icon) => ({
      ...icon,
      // Start at random screen positions
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      // Random slow velocity
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      // Phase for independent breathing/wobble
      phase: Math.random() * Math.PI * 2,
    }));
  }, [iconsData]);

  const nodesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current = { x: event.pageX, y: event.pageY, active: true };
    };

    const handleTouchMove = (event) => {
      const touch = event.touches?.[0];
      if (!touch) {
        return;
      }
      mouseRef.current = { x: touch.pageX, y: touch.pageY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("blur", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("blur", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || iconsData.length === 0) {
      return undefined;
    }

    let frameId = 0;

    const tick = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const mouse = mouseRef.current;

      particlesRef.current.forEach((p, index) => {
        const node = nodesRef.current[index];
        if (!node) return;

        // 1. Apply constant drift
        p.x += p.vx;
        p.y += p.vy;

        // 2. Wrap around screen boundaries
        const padding = 100; // allow icons to fully exit before wrapping
        if (p.x < -padding) p.x = viewportWidth + padding;
        if (p.x > viewportWidth + padding) p.x = -padding;
        if (p.y < -padding) p.y = viewportHeight + padding;
        if (p.y > viewportHeight + padding) p.y = -padding;

        // 3. Mouse Interaction
        let interactionDx = 0;
        let interactionDy = 0;

        if (mouse.active) {
          const iconSize = parseFloat(p.size) || 50;
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.hypot(dx, dy) || 1;

          const repelRadius = 150;
          const attractRadius = 400;

          if (distance < repelRadius) {
            const force = (1 - distance / repelRadius) * 4;
            interactionDx -= (dx / distance) * force;
            interactionDy -= (dy / distance) * force;
          } else if (distance < attractRadius) {
            const force = (1 - distance / attractRadius) * 1.5;
            interactionDx += (dx / distance) * force;
            interactionDy += (dy / distance) * force;
          }
        }

        // Apply temporary interaction displacement without mutating base position permanently for drift
        const displayX = p.x + interactionDx;
        const displayY = p.y + interactionDy;

        node.style.transform = `translate3d(${displayX}px, ${displayY}px, 0)`;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [iconsData]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {iconsData.map((icon, index) => (
        <div
          className={`absolute left-0 top-0 h-(--icon-size) w-(--icon-size) rounded-2xl border border-white/[0.06] bg-white/[0.03] p-1.5 backdrop-blur-(--icon-blur) opacity-[var(--icon-opacity)] animate-icon-breathe [animation-delay:var(--icon-delay)] will-change-transform sm:scale-80 sm:opacity-[var(--icon-opacity)] xl:scale-90 3xl:scale-[1.06] ${
            index >= 4 && index <= 6 ? "sm:hidden" : ""
          }`}
          key={icon.name}
          ref={(element) => {
            nodesRef.current[index] = element;
          }}
          style={{
            "--icon-size": icon.size,
            "--icon-blur": icon.blur,
            "--icon-delay": icon.delay,
            "--icon-opacity": icon.opacity,
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <img
            className="h-full w-full object-contain drop-shadow-sm pointer-events-none select-none"
            src={icon.icon}
            alt=""
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default FloatingIcons;
