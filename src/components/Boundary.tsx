import { Component, type ReactNode } from 'react';

/** Fanger fejl (fx en demo-fil der ikke kunne hentes efter en ny udgivelse), så resten af appen kører videre. */
export class Boundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return this.props.fallback ?? (
      <div className="empty-box">
        Oplevelsen kunne ikke indlæses. <button className="link" onClick={() => location.reload()}>Genindlæs siden</button>
      </div>
    );
  }
}
