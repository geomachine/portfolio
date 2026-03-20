"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [pos, setPos] = useState({ x: null, y: null });
    const [dragging, setDragging] = useState(false);
    const [snapping, setSnapping] = useState(false);
    const dragStart = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => { setMounted(true); }, []);

    // Set initial position once mounted
    useEffect(() => {
        if (mounted && btnRef.current && pos.x === null) {
            const rect = btnRef.current.getBoundingClientRect();
            setPos({ x: rect.left, y: rect.top });
        }
    }, [mounted]);

    const getSize = () => btnRef.current?.offsetWidth ?? 48;

    const snapToSide = (currentX, currentY) => {
        const size = getSize();
        const midX = window.innerWidth / 2;
        const snappedX = currentX + size / 2 < midX ? 12 : window.innerWidth - size - 12;
        const clampedY = Math.min(Math.max(currentY, 12), window.innerHeight - size - 12);
        setSnapping(true);
        setPos({ x: snappedX, y: clampedY });
        setTimeout(() => setSnapping(false), 400);
    };

    const onPointerDown = (e) => {
        const size = getSize();
        dragStart.current = {
            startX: e.clientX,
            startY: e.clientY,
            originX: pos.x,
            originY: pos.y,
            moved: false,
        };
        setDragging(true);
        btnRef.current.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!dragStart.current) return;
        const dx = e.clientX - dragStart.current.startX;
        const dy = e.clientY - dragStart.current.startY;

        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
            dragStart.current.moved = true;
        }

        const size = getSize();
        const newX = Math.min(Math.max(dragStart.current.originX + dx, 0), window.innerWidth - size);
        const newY = Math.min(Math.max(dragStart.current.originY + dy, 0), window.innerHeight - size);
        setPos({ x: newX, y: newY });
    };

    const onPointerUp = (e) => {
        if (!dragStart.current) return;
        const moved = dragStart.current.moved;
        dragStart.current = null;
        setDragging(false);

        if (!moved) {
            toggleTheme();
        } else {
            snapToSide(pos.x, pos.y);
        }
    };

    if (!mounted) return null;

    const style = pos.x !== null
        ? {
            left: pos.x,
            top: pos.y,
            right: 'auto',
            bottom: 'auto',
            transition: snapping ? 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          }
        : {};

    return (
        <button
            ref={btnRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={style}
            className={`fixed top-4 right-4 lg:top-8 lg:right-10 z-[60] flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-card border-2 border-foreground sketch-border hover:bg-primary-light group overflow-hidden focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background select-none touch-none ${dragging ? 'cursor-grabbing scale-105 shadow-xl' : 'cursor-grab'}`}
            aria-label="Toggle theme"
        >
            <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <span
                className="text-xl lg:text-3xl relative z-10 flex items-center justify-center w-full h-full text-foreground transition-transform duration-500"
                style={{ transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
                {theme === "light"
                    ? <Moon size={24} />
                    : <Sun size={24} />
                }
            </span>
        </button>
    );
}
