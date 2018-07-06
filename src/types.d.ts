interface Window {
  initialReduxState: any
}

declare interface ServiceWorkerConfig {
  onSuccess: (registration: ServiceWorkerRegistration) => void
  onUpdate: (registration: ServiceWorkerRegistration) => void
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
