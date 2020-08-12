import { useLayoutEffect, useEffect } from 'react';

const LayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export default {
    useLayoutEffect: LayoutEffect
};