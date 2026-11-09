# Phase 2 dependencies

    cd frontend
    npm install react-router-dom@^6.28.0 qrcode.react@^4.2.0 lucide-react@^0.468.0

Pin these versions: the code uses react-router-dom v6 APIs (not v7), qrcode.react v4 props
(`marginSize`, `title`) and lucide-react 0.4xx icon names.
Fonts (Fraunces, Instrument Sans, JetBrains Mono) load from Google Fonts in index.html.

Optional env overrides (frontend/.env). All are DEMO VALUES, not confirmed policy:

    VITE_DEPOSIT_CUP=20
    VITE_DEPOSIT_SMALL_BOX=50
    VITE_DEPOSIT_LARGE_BOX=100
    VITE_BORROW_HOURS=48
