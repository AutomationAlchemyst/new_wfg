import * as THREE from 'three';
import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

export interface Uniforms {
  uTime: { value: number };
  uResolution: { value: THREE.Vector2 };
  uMouse: { value: THREE.Vector2 };
  uScroll: { value: number };
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}