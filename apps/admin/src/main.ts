if (!(window as any).__MFE_SHELL_HOST__) {
  import('./bootstrap').catch(console.error);
}
