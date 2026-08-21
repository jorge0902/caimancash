import React from 'react';
import bannerMobile from '../assets/cubalink-banner-mobile.png';

const MobileBannerPreview = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at 50% 35%, rgba(89,214,181,.08), transparent 38%), #02080c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px',
            fontFamily: 'Inter, Manrope, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            color: '#F8FAFC'
        }}>
            <div style={{
                position: 'relative',
                width: 'min(100%, 430px)',
                height: '580px',
                overflow: 'hidden',
                borderRadius: '27px',
                background: '#06131B',
                border: '1px solid rgba(89,214,181,.18)',
                boxShadow: '0 28px 75px rgba(0,0,0,.62), inset 0 0 0 1px rgba(255,255,255,.025)',
                isolation: 'isolate'
            }}>
                <img
                    src={bannerMobile}
                    alt="Caiman Cash mobile"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        zIndex: -3,
                        transform: 'scale(1.01)'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: -2,
                    background: `
                        linear-gradient(180deg, rgba(2,8,12,.15) 0%, rgba(2,8,12,.03) 25%, rgba(2,8,12,.10) 45%, rgba(2,8,12,.58) 68%, rgba(2,8,12,.97) 100%),
                        linear-gradient(90deg, rgba(2,8,12,.25), transparent 70%)
                    `
                }} />
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    padding: '20px 19px 16px',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 850, letterSpacing: '-.045em' }}>
                                <span style={{
                                    width: '9px', height: '9px', borderRadius: '50%', background: '#59D6B5',
                                    boxShadow: '0 0 17px rgba(89,214,181,.9)'
                                }} />
                                <span>Caiman<span style={{ color: '#59D6B5' }}>Cash</span></span>
                            </div>
                            <div style={{ marginTop: '4px', marginLeft: '17px', color: '#59D6B5', fontSize: '7px', fontWeight: 800, letterSpacing: '.17em' }}>
                                REMESAS A CUBA
                            </div>
                        </div>
                        <div style={{
                            padding: '6px 9px', borderRadius: '999px',
                            border: '1px solid rgba(89,214,181,.2)',
                            background: 'rgba(4,18,25,.46)',
                            backdropFilter: 'blur(8px)',
                            color: '#b9cbd1', fontSize: '8px', fontWeight: 700
                        }}>
                            <span style={{ color: '#59D6B5', marginRight: '4px' }}>●</span>Seguro
                        </div>
                    </div>

                    <div style={{ marginTop: '18px', maxWidth: '340px' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '5px 8px', borderRadius: '999px',
                            background: 'rgba(89,214,181,.08)',
                            border: '1px solid rgba(89,214,181,.16)',
                            color: '#59D6B5', fontSize: '8px', fontWeight: 800,
                            letterSpacing: '.08em', textTransform: 'uppercase'
                        }}>
                            ✦ ENVÍA DINERO A CUBA
                        </div>

                        <h1 style={{
                            marginTop: '9px', fontSize: 'clamp(34px, 9.5vw, 44px)',
                            lineHeight: '.94', letterSpacing: '-.058em', fontWeight: 900,
                            textShadow: '0 3px 25px rgba(0,0,0,.35)'
                        }}>
                            Tu dinero.<br />
                            <span style={{ color: '#59D6B5' }}>Directo a Cuba.</span>
                        </h1>

                        <p style={{
                            marginTop: '9px', color: '#CBD5E1', fontSize: '13.5px',
                            lineHeight: '1.35', maxWidth: '300px'
                        }}>
                            Envía remesas de forma <strong style={{ color: '#F8FAFC' }}>rápida, sencilla y segura.</strong>
                        </p>

                        <div style={{
                            marginTop: '13px', display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', maxWidth: '385px'
                        }}>
                            <div style={{
                                padding: '8px 7px', borderRadius: '12px',
                                border: '1px solid rgba(89,214,181,.14)',
                                background: 'rgba(4,17,24,.55)',
                                backdropFilter: 'blur(9px)'
                            }}>
                                <div style={{ color: '#59D6B5', fontSize: '13px' }}>⚡</div>
                                <div style={{ marginTop: '3px', fontSize: '10px', fontWeight: 850 }}>Rápido</div>
                                <div style={{ marginTop: '2px', color: '#94A3B8', fontSize: '7px', lineHeight: '1.25' }}>Procesamiento ágil</div>
                            </div>
                            <div style={{
                                padding: '8px 7px', borderRadius: '12px',
                                border: '1px solid rgba(89,214,181,.14)',
                                background: 'rgba(4,17,24,.55)',
                                backdropFilter: 'blur(9px)'
                            }}>
                                <div style={{ color: '#59D6B5', fontSize: '13px' }}>◉</div>
                                <div style={{ marginTop: '3px', fontSize: '10px', fontWeight: 850 }}>Seguro</div>
                                <div style={{ marginTop: '2px', color: '#94A3B8', fontSize: '7px', lineHeight: '1.25' }}>Operación protegida</div>
                            </div>
                            <div style={{
                                padding: '8px 7px', borderRadius: '12px',
                                border: '1px solid rgba(89,214,181,.14)',
                                background: 'rgba(4,17,24,.55)',
                                backdropFilter: 'blur(9px)'
                            }}>
                                <div style={{ color: '#59D6B5', fontSize: '13px' }}>✓</div>
                                <div style={{ marginTop: '3px', fontSize: '10px', fontWeight: 850 }}>Fácil</div>
                                <div style={{ marginTop: '2px', color: '#94A3B8', fontSize: '7px', lineHeight: '1.25' }}>Sin complicaciones</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, minHeight: '10px' }} />

                    <div style={{
                        padding: '9px', borderRadius: '20px',
                        background: 'linear-gradient(180deg, rgba(5,20,27,.45), rgba(5,20,27,.75))',
                        border: '1px solid rgba(255,255,255,.08)',
                        backdropFilter: 'blur(12px)'
                    }}>
                        <button style={{
                            width: '100%', minHeight: '50px', border: 0, borderRadius: '15px',
                            background: '#59D6B5', color: '#06131B',
                            fontSize: '15px', fontWeight: 900, cursor: 'pointer',
                            boxShadow: '0 12px 32px rgba(89,214,181,.22)'
                        }}>
                            Enviar dinero a Cuba →
                        </button>
                        <div style={{ marginTop: '7px', textAlign: 'center', color: '#8ca1aa', fontSize: '9px' }}>
                            <span style={{ color: '#59D6B5' }}>●</span> Tu remesa, más cerca de casa
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileBannerPreview;
