export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 154;
    const top = element.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({
      top,
      behavior: 'smooth',
    });
    window.history.pushState(null, '', `#${sectionId}`);
  }
};