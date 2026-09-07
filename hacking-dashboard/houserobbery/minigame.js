(function () {
  const ReactRuntime = window.React,
    ReactDOMRuntime = window.ReactDOM;
  const et = ReactRuntime.StrictMode,
    tt = ReactDOMRuntime.createRoot,
    l = ReactRuntime.useState,
    O = ReactRuntime.useEffect,
    R = ReactRuntime.useCallback,
    Pe = ReactRuntime.useRef,
    Ae = ReactRuntime.useEffect,
    Je = ReactRuntime.useRef;
  const __jsx = (type, props, key) =>
    ReactRuntime.createElement(
      type,
      key === undefined ? props : Object.assign({}, props, { key: key }),
    );
  const t = __jsx,
    r = __jsx,
    Oe = __jsx;
  var q = typeof window.GetParentResourceName !== "function";
  if (q) document.body.style.background = "rgba(0, 0, 0, 0.6)";
  function je(c, p) {
    window.dispatchEvent(
      new MessageEvent("message", { data: { action: c, data: p } }),
    );
  }
  function oe(c, p) {
    let s = Je(p);
    Ae(() => {
      s.current = p;
    }, [p]),
      Ae(() => {
        function y(a) {
          let d = a.data;
          if (typeof d === "string")
            try {
              d = JSON.parse(d);
            } catch {}
          let { action: B, data: b } = d ?? {};
          if (B === c) s.current(b ?? {});
        }
        return (
          window.addEventListener("message", y),
          () => window.removeEventListener("message", y)
        );
      }, [c]);
  }
  async function I(c, p = {}, s) {
    if (q && s !== void 0) return console.log(`[NUI Dev] ${c}:`, s), s;
    if (q)
      return (
        console.warn(`[NUI Dev] No mock for '${c}'. Pass mockData as 3rd arg.`),
        {}
      );
    let y = window.GetParentResourceName();
    return (
      await fetch(`https://${y}/${c}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      })
    ).json();
  }
  if (q) setTimeout(() => je("open", {}), 100);
  var qe = {
      timeLimit: 45,
      maxAttempts: 6,
      cycleSpeeds: window.HouseRobberyDecryptorCycle.DEFAULT_SPEEDS,
      digitPoolSize: 4,
      codeLength: 4,
    },
    rrAudioContext = null,
    v = (c) => {
      let p = rrAudioContext;
      if (!p || p.state === "closed") {
        p = new (window.AudioContext || window.webkitAudioContext)();
        rrAudioContext = p;
      }
      if (p.state === "suspended") {
        void p.resume().catch(() => {});
      }

      let y = {
          keypad: { freq: 800, duration: 0.08, type: "square", volume: 0.15 },
          digitSelect: {
            freq: 600,
            duration: 0.06,
            type: "square",
            volume: 0.12,
          },
          correct: { freq: 880, duration: 0.15, type: "sine", volume: 0.2 },
          wrong: { freq: 200, duration: 0.25, type: "sawtooth", volume: 0.2 },
          success: { freq: 1000, duration: 0.3, type: "sine", volume: 0.25 },
          fail: { freq: 150, duration: 0.4, type: "sawtooth", volume: 0.25 },
          connect: { freq: 1200, duration: 0.12, type: "sine", volume: 0.2 },
          freqTune: {
            freq: 400,
            duration: 0.05,
            type: "triangle",
            volume: 0.1,
          },
          freqLocked: { freq: 900, duration: 0.2, type: "sine", volume: 0.25 },
          pinCorrect: {
            freq: 700,
            duration: 0.1,
            type: "square",
            volume: 0.15,
          },
          pinWrong: { freq: 250, duration: 0.2, type: "sawtooth", volume: 0.2 },
        }[c];
      if (y) {
        let a = p.createOscillator(),
          d = p.createGain();
        a.connect(d),
          d.connect(p.destination),
          (a.type = y.type),
          a.frequency.setValueAtTime(y.freq, p.currentTime),
          d.gain.setValueAtTime(y.volume, p.currentTime),
          d.gain.exponentialRampToValueAtTime(
            0.001,
            p.currentTime + y.duration,
          ),
          a.start(p.currentTime),
          a.stop(p.currentTime + y.duration);
      }
    };
  function ae() {
    let [c, p] = l(q),
      [s, y] = l("wires"),
      [a, d] = l("idle"),
      [B, b] = l("ANALYZING..."),
      [X, se] = l(""),
      [M, U] = l(""),
      [Q, z] = l(!1),
      [Z, le] = l(0),
      [ce, J] = l(30),
      [Me, de] = l(0),
      [ze, j] = l(!1),
      [We, pe] = l(100),
      [_e, ue] = l("scanning"),
      [He, fe] = l([]),
      [u, W] = l([]),
      [S, ge] = l([]),
      [ee, Fe] = l(""),
      [A, V] = l({ correct: 0, misplaced: 0 }),
      [he, ye] = l(0),
      [te, _] = l(0),
      [f, Ge] = l(qe),
      [Ue, Ve] = l("Normal"),
      [be, me] = l(0),
      [ve, ke] = l(0),
      [H, Ke] = l([]),
      [we, Ce] = l(null),
      [E, xe] = l([]),
      [it, $e] = l([]),
      [k, Ye] = l(50),
      [w, Se] = l(0),
      [K, Te] = l(!1),
      [Ot, Pt] = l(!0),
      D = Pe(null),
      T = Pe(null),
      Ct = Pe(u),
      Lt = Pe(S),
      Re = R((n) => {
        let i = "";
        for (let o = 0; o < n; o++)
          i += Math.floor(Math.random() * 10).toString();
        return i;
      }, []),
      Ee = R((n, i) => {
        let o = [];
        for (let g = 0; g < n.length; g++) {
          let C = [],
            N = n[g];
          C.push({ digit: N, active: !1 });
          let F = new Set([N]);
          while (C.length < i) {
            let x;
            do x = Math.floor(Math.random() * 10).toString();
            while (F.has(x));
            F.add(x), C.push({ digit: x, active: !1 });
          }
          for (let x = C.length - 1; x > 0; x--) {
            let G = Math.floor(Math.random() * (x + 1));
            [C[x], C[G]] = [C[G], C[x]];
          }
          o.push(C);
        }
        return o;
      }, []),
      Ne = R(() => {
        let n = [0, 1, 2, 3];
        for (let i = n.length - 1; i > 0; i--) {
          let o = Math.floor(Math.random() * (i + 1));
          [n[i], n[o]] = [n[o], n[i]];
        }
        return n;
      }, []),
      De = R(() => {
        return Math.floor(Math.random() * 80) + 10;
      }, []),
      m = R(() => {
        if (T.current) clearInterval(T.current);
        if (D.current) clearInterval(D.current);
        p(!1), I("close", {}, { success: !0 });
      }, []),
      Xe = R(
        (n) => {
          let i = Re(n.codeLength);
          Fe(i),
            fe(Ee(i, n.digitPoolSize)),
            W(Array(n.codeLength).fill(null)),
            ge(Array(n.codeLength).fill(!1)),
            y("wires"),
            d("idle"),
            b("TUNE FREQUENCY"),
            de(0),
            le(0),
            J(n.timeLimit),
            pe(100),
            j(!1),
            ue("scanning"),
            ye(0),
            _(0),
            V({ correct: 0, misplaced: 0 }),
            se(""),
            U(""),
            me(0),
            ke(0),
            Ce(null),
            xe([]);
          let o = Ne();
          $e(o), Ke(o);
          let g = De();
          Ye(g), Se(0), Te(!1), Pt(!0);
        },
        [Re, Ee, Ne, De],
      );
    oe("open", (n) => {
      let i = n.config || qe;
      Ge(i), Ve(n.difficulty || "Normal"), Xe(i), p(!0);
    }),
      oe("close", () => p(!1)),
      O(() => {
        Ct.current = u;
      }, [u]),
      O(() => {
        Lt.current = S;
      }, [S]),
      O(() => {
        let n = window.HouseRobberyDecryptorCycle;
        if (!c || a !== "idle" || s !== "hacking" || !n.hasStarted(u)) return;
        let i = n.getAttemptSpeed(f.cycleSpeeds, he);
        return (
          (T.current = setInterval(() => {
            fe((o) => n.rotateUnlockedPools(o, Ct.current, Lt.current)), Pt(!0);
          }, i)),
          () => {
            if (T.current) {
              clearInterval(T.current), (T.current = null);
            }
          }
        );
      }, [
        c,
        a,
        s,
        window.HouseRobberyDecryptorCycle.hasStarted(u),
        he,
        f.cycleSpeeds,
      ]),
      O(() => {
        if (!c || a !== "idle" || s !== "hacking") return;
        return (
          (D.current = setInterval(() => {
            J((n) => {
              if (n <= 1)
                return (
                  d("failed"),
                  b("TIMEOUT"),
                  v("fail"),
                  I(
                    "result",
                    { success: !1, reason: "timeout" },
                    { success: !1 },
                  ),
                  setTimeout(() => m(), 800),
                  0
                );
              return n - 1;
            }),
              de((n) => Math.min(100, n + 100 / f.timeLimit));
          }, 1000)),
          () => {
            if (D.current) clearInterval(D.current);
          }
        );
      }, [c, a, f.timeLimit, m]),
      O(() => {
        if (!c) return;
        let n = setInterval(() => {
          if (Math.random() > 0.85) j(!0), setTimeout(() => j(!1), 100);
        }, 2000);
        return () => clearInterval(n);
      }, [c]),
      O(() => {
        if (!c) return;
        let n = setInterval(() => {
          pe((i) => Math.max(60, i + (Math.random() - 0.5) * 20));
        }, 500);
        return () => clearInterval(n);
      }, [c]),
      O(() => {
        if (!c) return;
        let n = setInterval(() => {
          ue((i) => {
            if (i === "scanning") return "decrypting";
            if (i === "decrypting") return "injecting";
            return "scanning";
          });
        }, 1e4);
        return () => clearInterval(n);
      }, [c]);
    let $ = R(
        (n) => {
          if (a !== "idle") return;
          if (s !== "wires") return;
          if (K) return;
          let i = Math.max(0, Math.min(100, w + n));
          if ((Se(i), v("freqTune"), i === k))
            Te(!0),
              b("SIGNAL LOCKED"),
              d("success"),
              v("freqLocked"),
              setTimeout(() => {
                y("connecting"), d("idle"), b("CONNECT DECRYPTOR");
              }, 1000);
        },
        [a, s, w, k, K],
      ),
      Qe = R(
        (n) => {
          if (a !== "idle") return;
          if (s !== "connecting") return;
          if (E.includes(n)) return;
          let i = H[ve];
          if (n === i) {
            let o = [...E, n];
            if (
              (xe(o),
              ke((g) => g + 1),
              me(Math.floor((o.length / 4) * 100)),
              v("pinCorrect"),
              o.length === 4)
            )
              b("DEVICE CONNECTED"),
                v("connect"),
                setTimeout(() => {
                  y("hacking"), b("ANALYZING...");
                }, 1000);
            else Ce(null);
          } else {
            if ((z(!0), b("BREACH ALERT"), d("failed"), v("fail"), T.current))
              clearInterval(T.current);
            if (D.current) clearInterval(D.current);
            I("result", { success: !1, reason: "wrong_pin" }, { success: !1 }),
              setTimeout(() => m(), 800);
          }
        },
        [a, s, E, H, ve],
      ),
      Ze = R(
        (n, i) => {
          if (a !== "idle") return;
          if (s !== "hacking") return;
          if (S[n]) return;
          if (u[n] !== null || !Ot) return;
          Pt(!1), v("digitSelect");
          let o = [...u];
          (o[n] = i), W(o);
          let g = o.filter((N) => N !== null).length;
          if (
            (_(Math.min(100, Math.floor((g / f.codeLength) * 100))),
            o.every((N) => N !== null))
          ) {
            let N = o.join("");
            if (N === ee) {
              if ((b("CODE EXTRACTED"), se(N), v("correct"), T.current))
                clearInterval(T.current);
              setTimeout(() => {
                y("input"), b("ENTER CODE"), d("idle");
              }, 1500);
            } else {
              let F = Z + 1;
              le(F),
                z(!0),
                b("DECRYPTING..."),
                v("wrong"),
                setTimeout(() => z(!1), 300);
              let x = 0,
                G = 0,
                P = ee.split(""),
                ne = N.split(""),
                ie = new Set(),
                re = [...S];
              for (let h = 0; h < P.length; h++)
                if (ne[h] === P[h]) x++, ie.add(h), (re[h] = !0);
              for (let h = 0; h < P.length; h++)
                if (ne[h] !== P[h]) {
                  for (let L = 0; L < P.length; L++)
                    if (!ie.has(L) && P[L] === ne[h]) {
                      G++, ie.add(L);
                      break;
                    }
                }
              V({ correct: x, misplaced: G }), ge(re);
              let Be = o.map((h, L) => (re[L] ? h : null));
              if (
                (setTimeout(() => {
                  W(Be),
                    _(
                      Math.floor(
                        (Be.filter((h) => h !== null).length / f.codeLength) *
                          100,
                      ),
                    ),
                    ye((h) => h + 1),
                    J(f.timeLimit),
                    V({ correct: 0, misplaced: 0 });
                }, 1000),
                F >= f.maxAttempts)
              ) {
                if ((d("failed"), b("LOCKOUT"), v("fail"), T.current))
                  clearInterval(T.current);
                if (D.current) clearInterval(D.current);
                I(
                  "result",
                  { success: !1, reason: "lockout" },
                  { success: !1 },
                ),
                  setTimeout(() => m(), 800);
              }
            }
          }
        },
        [a, s, u, S, ee, Z, f, m, Ot],
      ),
      Y = R(
        (n) => {
          if (s !== "input") return;
          if (a !== "idle") return;
          if ((v("keypad"), n === "ESC" || n === "NON")) {
            U("");
            return;
          }
          if (n === "◄►") {
            U((i) => i.slice(0, -1));
            return;
          }
          if (n === "↵" || n === "OK") {
            if (M.length !== f.codeLength) {
              z(!0), v("wrong"), setTimeout(() => z(!1), 300);
              return;
            }
            if (M === X)
              b("WELCOME HOME"),
                d("success"),
                v("success"),
                setTimeout(() => {
                  I("result", { success: !0 }, { success: !0 }), m();
                }, 1500);
            else
              b("ACCESS DENIED"),
                d("failed"),
                v("fail"),
                setTimeout(() => {
                  I(
                    "result",
                    { success: !1, reason: "wrong_code" },
                    { success: !1 },
                  ),
                    m();
                }, 800);
            return;
          }
          if (/^[0-9*#]$/.test(n) && M.length < f.codeLength) U((i) => i + n);
        },
        [s, a, M, X, f.codeLength, m],
      ),
      Ie = R(
        (n) => {
          if (a !== "idle") return;
          switch (n) {
            case "ESC":
            case "NON":
              W(Array(f.codeLength).fill(null)),
                _(0),
                V({ correct: 0, misplaced: 0 }),
                b("ANALYZING...");
              break;
            case "◄►":
              let i = u.reduceRight((o, g, C) => {
                return o === -1 && g !== null ? C : o;
              }, -1);
              if (i !== -1) {
                let o = [...u];
                (o[i] = null),
                  W(o),
                  _(Math.max(0, te - Math.floor(100 / f.codeLength)));
              }
              break;
          }
        },
        [a, u, te, f.codeLength],
      );
    if (
      (O(() => {
        let n = (i) => {
          if (i.key === "Escape") m();
          if (i.key === "Backspace") Ie("◄►");
        };
        return (
          window.addEventListener("keydown", n),
          () => window.removeEventListener("keydown", n)
        );
      }, [Ie, m]),
      !c)
    )
      return null;
    let Le =
      a === "success" ? "#22c55e" : a === "failed" ? "#ef4444" : "#06b6d4";
    return r("div", {
      style: e.overlay,
      children: [
        s === "wires" &&
          t("div", {
            style: e.wireOverlay,
            children: r("div", {
              style: { ...e.wireContainer, ...(Q ? e.shake : {}) },
              children: [
                r("div", {
                  style: e.wireHeader,
                  children: [
                    t("span", {
                      style: e.wireBrand,
                      children: "FREQ TUNER v2.1",
                    }),
                    t("span", {
                      style: {
                        color: K ? "#22c55e" : "#f97316",
                        fontSize: "8px",
                        fontWeight: "700",
                      },
                      children: K ? "LOCKED" : "SCANNING",
                    }),
                  ],
                }),
                r("div", {
                  style: e.wireScreen,
                  children: [
                    r("div", {
                      style: e.wireRow,
                      children: [
                        t("span", { style: e.wireLabel, children: "TASK:" }),
                        t("span", {
                          style: e.wireValue,
                          children: "MATCH SIGNAL FREQUENCY",
                        }),
                      ],
                    }),
                    t("div", { style: e.wireDivider }),
                    t("div", {
                      style: e.freqDisplay,
                      children: t("div", {
                        style: e.freqWaveContainer,
                        children: r("svg", {
                          viewBox: "0 0 200 40",
                          style: e.freqWave,
                          children: [
                            t("path", {
                              d: `M0,20 Q25,${10 + Math.sin(k * 0.1) * 10} 50,20 T100,20 T150,20 T200,20`,
                              fill: "none",
                              stroke: "#f97316",
                              strokeWidth: "2",
                            }),
                            t("path", {
                              d: `M0,20 Q25,${10 + Math.sin(w * 0.1) * 10} 50,20 T100,20 T150,20 T200,20`,
                              fill: "none",
                              stroke: "#22c55e",
                              strokeWidth: "2",
                              opacity: w > 0 ? 1 : 0.3,
                            }),
                          ],
                        }),
                      }),
                    }),
                    r("div", {
                      style: e.freqBars,
                      children: [
                        r("div", {
                          style: e.freqBarContainer,
                          children: [
                            t("span", {
                              style: e.freqBarLabel,
                              children: "TARGET",
                            }),
                            t("div", {
                              style: e.freqBar,
                              children: t("div", {
                                style: {
                                  ...e.freqBarFill,
                                  height: `${k}%`,
                                  backgroundColor: "#f97316",
                                },
                              }),
                            }),
                            t("span", { style: e.freqValue, children: k }),
                          ],
                        }),
                        t("div", {
                          style: e.freqSpacer,
                          children: t("span", {
                            style: e.freqArrow,
                            children: "→",
                          }),
                        }),
                        r("div", {
                          style: e.freqBarContainer,
                          children: [
                            t("span", {
                              style: e.freqBarLabel,
                              children: "CURRENT",
                            }),
                            t("div", {
                              style: e.freqBar,
                              children: t("div", {
                                style: {
                                  ...e.freqBarFill,
                                  height: `${w}%`,
                                  backgroundColor:
                                    w === k ? "#22c55e" : "#3b82f6",
                                },
                              }),
                            }),
                            t("span", {
                              style: {
                                ...e.freqValue,
                                color: w === k ? "#22c55e" : "#3b82f6",
                              },
                              children: w || "--",
                            }),
                          ],
                        }),
                      ],
                    }),
                    t("div", { style: e.wireDivider }),
                    r("div", {
                      style: e.freqControls,
                      children: [
                        t("button", {
                          style: e.freqButton,
                          onClick: () => $(-10),
                          children: "-10",
                        }),
                        t("button", {
                          style: e.freqButton,
                          onClick: () => $(-1),
                          children: "-1",
                        }),
                        t("button", {
                          style: e.freqButton,
                          onClick: () => $(1),
                          children: "+1",
                        }),
                        t("button", {
                          style: e.freqButton,
                          onClick: () => $(10),
                          children: "+10",
                        }),
                      ],
                    }),
                    t("div", {
                      style: e.freqMatchIndicator,
                      children: t("div", {
                        style: {
                          ...e.freqMatchBar,
                          width:
                            w === k
                              ? "100%"
                              : `${Math.max(0, 100 - Math.abs(w - k) * 2)}%`,
                          backgroundColor: w === k ? "#22c55e" : "#f97316",
                        },
                      }),
                    }),
                    r("div", {
                      style: e.wireRow,
                      children: [
                        t("span", { style: e.wireLabel, children: "SIGNAL:" }),
                        t("span", {
                          style: {
                            ...e.wireValue,
                            color: w === k ? "#22c55e" : "#f97316",
                          },
                          children: w === k ? "LOCKED" : "SEARCHING",
                        }),
                      ],
                    }),
                    t("div", {
                      style: {
                        ...e.wireStatus,
                        color: a === "success" ? "#22c55e" : "#f97316",
                      },
                      children: B,
                    }),
                  ],
                }),
                r("div", {
                  style: e.wireFooter,
                  children: [
                    r("span", {
                      style: e.wirePort,
                      children: ["FREQ: ", k, "Hz"],
                    }),
                    t("span", { style: e.wireBaud, children: "BAND: 2.4GHz" }),
                  ],
                }),
                t("button", { style: e.wireClose, onClick: m, children: "✕" }),
              ],
            }),
          }),
        r("div", {
          style: e.scene,
          children: [
            r("div", {
              style: {
                ...e.securityPanel,
                ...(Q ? e.shake : {}),
                opacity: s === "wires" ? 0.4 : 1,
              },
              children: [
                r("div", {
                  style: e.panelLeft,
                  children: [
                    t("div", {
                      style: e.alickRow,
                      children: t("span", {
                        style: e.alick,
                        children: "ALICK",
                      }),
                    }),
                    t("div", {
                      style: e.screenOuter,
                      children: r("div", {
                        style: {
                          ...e.screen,
                          backgroundColor:
                            a === "failed"
                              ? "#ef4444"
                              : s === "input" && a === "success"
                                ? "#22c55e"
                                : s === "input"
                                  ? "#18181b"
                                  : s === "wires"
                                    ? "#0a0a0a"
                                    : "#06b6d4",
                        },
                        children: [
                          a === "failed"
                            ? t("span", {
                                style: e.breachText,
                                children: "BREACH ALERT",
                              })
                            : s === "input" && a === "success"
                              ? t("span", {
                                  style: e.welcomeText,
                                  children: "WELCOME HOME",
                                })
                              : s === "input" && a === "idle"
                                ? r("div", {
                                    style: e.inputDisplay,
                                    children: [
                                      t("span", {
                                        style: e.inputLabel,
                                        children: "CODE:",
                                      }),
                                      t("span", {
                                        style: e.inputCode,
                                        children: M.padEnd(f.codeLength, "_")
                                          .split("")
                                          .join(" "),
                                      }),
                                    ],
                                  })
                                : t("svg", {
                                    viewBox: "0 0 24 24",
                                    style: {
                                      ...e.diamond,
                                      opacity: s === "wires" ? 0.2 : 1,
                                    },
                                    children: t("path", {
                                      fill: "#fff",
                                      d: "M12 2L2 12l10 10 10-10L12 2z",
                                    }),
                                  }),
                          t("div", { style: e.scanlines }),
                        ],
                      }),
                    }),
                    r("div", {
                      style: e.keypad,
                      children: [
                        [
                          { num: "1", sub: "", action: "1" },
                          { num: "2", sub: "ABC", action: "2" },
                          { num: "3", sub: "DEF", action: "3" },
                          { num: "ESC", sub: "CLR", action: "ESC" },
                        ].map((n) =>
                          r(
                            "button",
                            {
                              style: {
                                ...e.key,
                                color: n.num === "ESC" ? "#ef4444" : "#fff",
                              },
                              onClick: () => Y(n.action),
                              children: [
                                t("span", { style: e.keyNum, children: n.num }),
                                n.sub &&
                                  t("span", {
                                    style: e.keySub,
                                    children: n.sub,
                                  }),
                              ],
                            },
                            n.num,
                          ),
                        ),
                        [
                          { num: "4", sub: "GHI", action: "4" },
                          { num: "5", sub: "JKL", action: "5" },
                          { num: "6", sub: "MNO", action: "6" },
                          { num: "▲", sub: "", action: "" },
                        ].map((n) =>
                          r(
                            "button",
                            {
                              style: e.key,
                              onClick: () => Y(n.action),
                              children: [
                                t("span", { style: e.keyNum, children: n.num }),
                                n.sub &&
                                  t("span", {
                                    style: e.keySub,
                                    children: n.sub,
                                  }),
                              ],
                            },
                            n.num,
                          ),
                        ),
                        [
                          { num: "7", sub: "PQRS", action: "7" },
                          { num: "8", sub: "TUV", action: "8" },
                          { num: "9", sub: "WXYZ", action: "9" },
                          { num: "▼", sub: "", action: "" },
                        ].map((n) =>
                          r(
                            "button",
                            {
                              style: e.key,
                              onClick: () => Y(n.action),
                              children: [
                                t("span", { style: e.keyNum, children: n.num }),
                                n.sub &&
                                  t("span", {
                                    style: e.keySub,
                                    children: n.sub,
                                  }),
                              ],
                            },
                            n.num,
                          ),
                        ),
                        [
                          { num: "◄►", sub: "", action: "◄►" },
                          { num: "0", sub: "", action: "0" },
                          { num: "*", sub: "", action: "*" },
                          { num: "↵", sub: "OK", action: "OK", isEnter: !0 },
                        ].map((n) =>
                          r(
                            "button",
                            {
                              style: {
                                ...e.key,
                                color: n.isEnter
                                  ? "#22c55e"
                                  : n.num === "◄►"
                                    ? "#f97316"
                                    : "#fff",
                              },
                              onClick: () => Y(n.action),
                              children: [
                                t("span", { style: e.keyNum, children: n.num }),
                                n.sub &&
                                  t("span", {
                                    style: e.keySub,
                                    children: n.sub,
                                  }),
                              ],
                            },
                            n.num,
                          ),
                        ),
                      ],
                    }),
                  ],
                }),
                r("div", {
                  style: e.panelRight,
                  children: [
                    t("div", {
                      style: {
                        ...e.statusLight,
                        backgroundColor:
                          s === "wires"
                            ? "#27272a"
                            : a === "success"
                              ? "#22c55e"
                              : "#ef4444",
                        boxShadow:
                          s === "wires"
                            ? "none"
                            : a === "success"
                              ? "0 0 16px rgba(34, 197, 94, 0.9)"
                              : "0 0 12px rgba(239, 68, 68, 0.7)",
                      },
                    }),
                    t("div", {
                      style: e.speaker,
                      children: Array.from({ length: 7 }).map((n, i) =>
                        t(
                          "div",
                          {
                            style: e.speakerRow,
                            children: Array.from({ length: 7 }).map((o, g) =>
                              t("div", { style: e.speakerHole }, g),
                            ),
                          },
                          i,
                        ),
                      ),
                    }),
                    t("div", {
                      style: e.scannerRow,
                      children: t("div", {
                        style: e.fingerprintOuter,
                        children: t("div", {
                          style: e.fingerprint,
                          children: t("div", {
                            style: {
                              ...e.fingerprintInner,
                              boxShadow:
                                a === "failed"
                                  ? "inset 0 0 20px rgba(239, 68, 68, 0.55)"
                                  : s === "wires"
                                    ? "inset 0 0 15px rgba(0,0,0,0.5)"
                                    : "inset 0 0 20px rgba(59, 130, 246, 0.55)",
                              border:
                                a === "failed"
                                  ? "1px solid rgba(239, 68, 68, 0.6)"
                                  : s === "wires"
                                    ? "1px solid #333"
                                    : "1px solid rgba(59, 130, 246, 0.6)",
                            },
                            children: t("svg", {
                              viewBox: "0 0 24 24",
                              style: {
                                ...e.fingerprintIcon,
                                color:
                                  a === "failed"
                                    ? "#ef4444"
                                    : s === "wires"
                                      ? "#555"
                                      : "#3b82f6",
                              },
                              children: t("path", {
                                fill: "currentColor",
                                d: "M17.81,4.47c-0.08,0-0.16-0.02-0.23-0.06C15.66,3.42,14,3,12.01,3c-1.98,0-3.86,0.47-5.57,1.41c-0.24,0.13-0.54,0.04-0.68-0.2c-0.13-0.24-0.04-0.55,0.2-0.68C7.82,2.52,9.86,2,12.01,2c2.13,0,3.99,0.47,6.03,1.52c0.25,0.13,0.34,0.43,0.21,0.67C18.16,4.39,17.99,4.47,17.81,4.47z M3.5,9.72c-0.1,0-0.2-0.03-0.29-0.09c-0.21-0.16-0.25-0.47-0.09-0.68c0.97-1.29,2.2-2.33,3.66-3.07c3.06-1.56,6.53-1.56,9.59,0c1.46,0.74,2.69,1.77,3.66,3.05c0.16,0.21,0.12,0.52-0.09,0.68c-0.21,0.16-0.52,0.12-0.68-0.09c-0.88-1.17-2-2.11-3.32-2.78c-2.79-1.42-5.94-1.42-8.73,0c-1.33,0.67-2.45,1.62-3.33,2.79C3.79,9.66,3.65,9.72,3.5,9.72z M9.75,21.79c-0.13,0-0.26-0.05-0.35-0.13c-0.91-0.91-1.41-1.56-2.13-2.89c-0.74-1.37-1.12-2.96-1.12-4.71c0-3.21,2.64-5.83,5.89-5.83s5.89,2.62,5.89,5.83c0,0.27-0.22,0.49-0.5,0.49s-0.5-0.22-0.5-0.49c0-2.67-2.2-4.85-4.89-4.85c-2.69,0-4.89,2.18-4.89,4.85c0,1.58,0.34,3,1.01,4.21c0.68,1.26,1.13,1.82,1.95,2.64c0.19,0.19,0.19,0.5,0,0.69C10.01,21.74,9.88,21.79,9.75,21.79z M16.92,19.75c-1.23,0-2.29-0.33-3.19-0.96c-1.49-1.05-2.38-2.66-2.38-4.31c0-0.27,0.22-0.49,0.5-0.49s0.5,0.22,0.5,0.49c0,1.34,0.73,2.69,1.99,3.58c0.75,0.52,1.62,0.77,2.58,0.77c0.24,0,0.64-0.03,1.04-0.1c0.27-0.05,0.53,0.13,0.58,0.4c0.05,0.27-0.13,0.53-0.4,0.58C17.72,19.72,17.22,19.75,16.92,19.75z M14.91,22c-0.06,0-0.13-0.01-0.19-0.03c-1.12-0.39-1.96-0.87-2.84-1.68c-1.32-1.21-2.06-2.85-2.06-4.62c0-0.27,0.22-0.49,0.5-0.49s0.5,0.22,0.5,0.49c0,1.5,0.63,2.89,1.77,3.94c0.78,0.72,1.52,1.14,2.51,1.49c0.26,0.09,0.39,0.37,0.3,0.62C15.31,21.87,15.11,22,14.91,22z",
                              }),
                            }),
                          }),
                        }),
                      }),
                    }),
                    r("span", {
                      style: e.thriftex,
                      children: [
                        t("span", { style: e.thrift, children: "THRIFT" }),
                        t("span", { style: e.ex, children: "EX" }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            t("div", { style: e.cable }),
            s === "connecting" &&
              r("div", {
                style: { ...e.hackDevice, ...(Q ? e.shake : {}) },
                children: [
                  r("div", {
                    style: e.hackHeader,
                    children: [
                      t("span", {
                        style: e.hackBrand,
                        children: "DECRYPTOR v2.4",
                      }),
                      t("span", {
                        style: {
                          color: "#f97316",
                          fontSize: "8px",
                          fontWeight: "700",
                        },
                        children: "DISCONNECTED",
                      }),
                    ],
                  }),
                  r("div", {
                    style: e.hackScreen,
                    children: [
                      r("div", {
                        style: e.hackRow,
                        children: [
                          t("span", {
                            style: e.hackLabel,
                            children: "STATUS:",
                          }),
                          t("span", {
                            style: { ...e.hackValue, color: "#f97316" },
                            children: "AWAITING CONNECTION",
                          }),
                        ],
                      }),
                      t("div", { style: e.hackDivider }),
                      t("div", {
                        style: e.hackTarget,
                        children: t("span", {
                          style: e.hackLabel,
                          children: "SELECT PORT SEQUENCE:",
                        }),
                      }),
                      r("div", {
                        style: e.pinContainer,
                        children: [
                          r("div", {
                            style: e.pinDevice,
                            children: [
                              t("span", {
                                style: e.pinLabel,
                                children: "TERMINAL",
                              }),
                              t("div", {
                                style: e.pinGrid,
                                children: [0, 1, 2, 3].map((n) =>
                                  t(
                                    "button",
                                    {
                                      style: {
                                        ...e.pinButton,
                                        backgroundColor: E.includes(n)
                                          ? "#22c55e"
                                          : we === n
                                            ? "#f97316"
                                            : "#18181b",
                                        borderColor: E.includes(n)
                                          ? "#22c55e"
                                          : we === n
                                            ? "#f97316"
                                            : "#27272a",
                                      },
                                      onClick: () => Qe(n),
                                      disabled: E.includes(n),
                                      children: n + 1,
                                    },
                                    n,
                                  ),
                                ),
                              }),
                            ],
                          }),
                          r("div", {
                            style: e.pinSpacer,
                            children: [
                              t("span", { style: e.pinArrow, children: "→" }),
                              t("span", { style: e.pinArrow, children: "←" }),
                            ],
                          }),
                          r("div", {
                            style: e.pinDevice,
                            children: [
                              t("span", {
                                style: e.pinLabel,
                                children: "DECRYPTOR",
                              }),
                              t("div", {
                                style: e.pinGrid,
                                children: [0, 1, 2, 3].map((n) =>
                                  t(
                                    "button",
                                    {
                                      style: {
                                        ...e.pinButton,
                                        backgroundColor: E.includes(H[n])
                                          ? "#22c55e"
                                          : "#18181b",
                                        borderColor: E.includes(H[n])
                                          ? "#22c55e"
                                          : "#27272a",
                                      },
                                      disabled: !0,
                                      children: H[n] + 1,
                                    },
                                    n,
                                  ),
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                      t("div", { style: e.hackDivider }),
                      t("div", {
                        style: e.hackProgress,
                        children: t("div", {
                          style: e.hackProgressBar,
                          children: t("div", {
                            style: {
                              ...e.hackProgressFill,
                              width: `${be}%`,
                              backgroundColor:
                                be === 100 ? "#22c55e" : "#f97316",
                            },
                          }),
                        }),
                      }),
                      r("div", {
                        style: e.hackRow,
                        children: [
                          t("span", {
                            style: e.hackLabel,
                            children: "CONNECTED:",
                          }),
                          r("span", {
                            style: {
                              ...e.hackValue,
                              color: E.length === 4 ? "#22c55e" : "#f97316",
                            },
                            children: [E.length, "/4"],
                          }),
                        ],
                      }),
                      t("div", {
                        style: {
                          ...e.hackStatus,
                          color: a === "success" ? "#22c55e" : "#f97316",
                        },
                        children: B,
                      }),
                    ],
                  }),
                  r("div", {
                    style: {
                      ...e.hackFooter,
                      borderTop: "1px solid #1f1f23",
                      paddingTop: "8px",
                      marginTop: "8px",
                    },
                    children: [
                      t("span", { style: e.hackPort, children: "PORT: 4478" }),
                      t("span", { style: e.hackBaud, children: "9600 BAUD" }),
                    ],
                  }),
                  t("button", {
                    style: e.hackClose,
                    onClick: m,
                    children: "✕",
                  }),
                ],
              }),
            s === "hacking" &&
              r("div", {
                style: { ...e.hackDevice, ...(ze ? e.glitch : {}) },
                children: [
                  r("div", {
                    style: e.hackHeader,
                    children: [
                      t("span", {
                        style: e.hackBrand,
                        children: "DECRYPTOR v2.4",
                      }),
                      t("div", {
                        style: e.signalBar,
                        children: t("div", {
                          style: { ...e.signalFill, width: `${We}%` },
                        }),
                      }),
                    ],
                  }),
                  r("div", {
                    style: e.hackScreen,
                    children: [
                      r("div", {
                        style: e.hackRow,
                        children: [
                          t("span", { style: e.hackLabel, children: "PHASE:" }),
                          t("span", {
                            style: e.hackValue,
                            children: _e.toUpperCase(),
                          }),
                        ],
                      }),
                      r("div", {
                        style: e.hackRow,
                        children: [
                          t("span", { style: e.hackLabel, children: "TIME:" }),
                          r("span", {
                            style: {
                              ...e.hackValue,
                              color: ce < 10 ? "#ef4444" : "#fff",
                            },
                            children: [ce, "s"],
                          }),
                        ],
                      }),
                      r("div", {
                        style: e.hackRow,
                        children: [
                          t("span", { style: e.hackLabel, children: "TRIES:" }),
                          t("span", {
                            style: e.hackValue,
                            children: f.maxAttempts - Z,
                          }),
                        ],
                      }),
                      t("div", { style: e.hackDivider }),
                      t("div", {
                        style: e.hackTarget,
                        children: r("span", {
                          style: e.hackLabel,
                          children: ["SEQUENCE [", Ue.toUpperCase(), "]:"],
                        }),
                      }),
                      t("div", {
                        style: e.digitPoolsContainer,
                        children: He.map((n, i) =>
                          r(
                            "div",
                            {
                              style: e.digitPoolColumn,
                              children: [
                                n.map((o, g) =>
                                  t(
                                    "button",
                                    {
                                      style: {
                                        ...e.digitTile,
                                        backgroundColor: S[i]
                                          ? u[i] === o.digit
                                            ? "#22c55e"
                                            : "#18181b"
                                          : u[i] !== null
                                            ? u[i] === o.digit
                                              ? "#f97316"
                                              : "#18181b"
                                            : "#18181b",
                                        border: S[i]
                                          ? u[i] === o.digit
                                            ? "1px solid #22c55e"
                                            : "1px solid #27272a"
                                          : u[i] !== null
                                            ? u[i] === o.digit
                                              ? "1px solid #f97316"
                                              : "1px solid #27272a"
                                            : "1px solid #27272a",
                                        opacity:
                                          (S[i] || u[i] !== null) &&
                                          u[i] !== o.digit
                                            ? 0.3
                                            : 1,
                                        cursor:
                                          S[i] || u[i] !== null || !Ot
                                            ? "default"
                                            : "pointer",
                                      },
                                      onClick: () => Ze(i, o.digit),
                                      disabled: S[i] || u[i] !== null || !Ot,
                                      children: o.digit,
                                    },
                                    g,
                                  ),
                                ),
                                t("div", {
                                  style: {
                                    ...e.lockIndicator,
                                    backgroundColor: S[i]
                                      ? "#22c55e"
                                      : u[i] !== null
                                        ? "#f97316"
                                        : "#27272a",
                                  },
                                }),
                              ],
                            },
                            i,
                          ),
                        ),
                      }),
                      t("div", {
                        style: e.hintRow,
                        children: r("span", {
                          style: e.hintText,
                          children: [
                            A.correct > 0 && `✓ ${A.correct} correct`,
                            A.correct > 0 && A.misplaced > 0 && " | ",
                            A.misplaced > 0 && `↔ ${A.misplaced} misplaced`,
                          ],
                        }),
                      }),
                      t("div", {
                        style: e.hackProgress,
                        children: t("div", {
                          style: e.hackProgressBar,
                          children: t("div", {
                            style: { ...e.hackProgressFill, width: `${Me}%` },
                          }),
                        }),
                      }),
                      r("div", {
                        style: e.hackRow,
                        children: [
                          t("span", { style: e.hackLabel, children: "SCORE:" }),
                          r("span", {
                            style: { ...e.hackValue, color: "#f97316" },
                            children: [te, "%"],
                          }),
                        ],
                      }),
                      t("div", {
                        style: { ...e.hackStatus, color: Le },
                        children: B,
                      }),
                    ],
                  }),
                  r("div", {
                    style: {
                      ...e.hackFooter,
                      borderTop: "1px solid #1f1f23",
                      paddingTop: "8px",
                      marginTop: "8px",
                    },
                    children: [
                      t("span", { style: e.hackPort, children: "PORT: 4478" }),
                      t("span", { style: e.hackBaud, children: "9600 BAUD" }),
                    ],
                  }),
                  t("button", {
                    style: e.hackClose,
                    onClick: m,
                    children: "✕",
                  }),
                ],
              }),
            s === "input" &&
              r("div", {
                style: e.hackDevice,
                children: [
                  r("div", {
                    style: e.hackHeader,
                    children: [
                      t("span", {
                        style: e.hackBrand,
                        children: "DECRYPTOR v2.4",
                      }),
                      t("span", {
                        style: {
                          color: "#22c55e",
                          fontSize: "8px",
                          fontWeight: "700",
                        },
                        children: "CONNECTED",
                      }),
                    ],
                  }),
                  r("div", {
                    style: e.hackScreen,
                    children: [
                      t("div", {
                        style: e.hackRow,
                        children: t("span", {
                          style: e.hackLabel,
                          children: "CODE EXTRACTED:",
                        }),
                      }),
                      t("div", {
                        style: e.revealedCodeContainer,
                        children: t("span", {
                          style: e.revealedCode,
                          children: X.split("").join(" "),
                        }),
                      }),
                      t("div", { style: e.hackDivider }),
                      r("div", {
                        style: e.hackRow,
                        children: [
                          t("span", {
                            style: e.hackLabel,
                            children: "STATUS:",
                          }),
                          t("span", {
                            style: { ...e.hackValue, color: "#22c55e" },
                            children: "AWAITING INPUT",
                          }),
                        ],
                      }),
                      r("div", {
                        style: e.hackRow,
                        children: [
                          t("span", {
                            style: e.hackLabel,
                            children: "DEVICE:",
                          }),
                          t("span", {
                            style: e.hackValue,
                            children: "ALICK TERMINAL",
                          }),
                        ],
                      }),
                      t("div", {
                        style: {
                          ...e.hackStatus,
                          color: Le,
                          marginTop: "12px",
                        },
                        children: B,
                      }),
                    ],
                  }),
                  r("div", {
                    style: {
                      ...e.hackFooter,
                      borderTop: "1px solid #1f1f23",
                      paddingTop: "8px",
                      marginTop: "8px",
                    },
                    children: [
                      t("span", { style: e.hackPort, children: "PORT: 4478" }),
                      t("span", { style: e.hackBaud, children: "9600 BAUD" }),
                    ],
                  }),
                  t("button", {
                    style: e.hackClose,
                    onClick: m,
                    children: "✕",
                  }),
                ],
              }),
          ],
        }),
      ],
    });
  }
  var e = {
    overlay: {
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "monospace",
    },
    scene: { display: "flex", alignItems: "flex-start", gap: "24px" },
    securityPanel: {
      position: "relative",
      display: "flex",
      background: "linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 100%)",
      borderRadius: "12px",
      padding: "0",
      border: "none",
      boxShadow:
        "0 30px 80px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255,255,255,0.08)",
      backgroundClip: "padding-box",
      minWidth: "340px",
    },
    panelLeft: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "14px",
      paddingRight: "12px",
      borderRight: "2px solid #0a0a0a",
    },
    alickRow: {
      display: "flex",
      justifyContent: "center",
      width: "191px",
      marginBottom: "2px",
    },
    alick: {
      color: "#666",
      fontSize: "9px",
      fontWeight: "600",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      textShadow: "0 1px 0 rgba(0,0,0,0.8)",
    },
    screenOuter: {
      padding: "6px",
      background: "linear-gradient(180deg, #0a0a0a 0%, #151515 100%)",
      borderRadius: "6px",
      boxShadow:
        "inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)",
      width: "191px",
      border: "1px solid #222",
    },
    screen: {
      width: "100%",
      height: "72px",
      borderRadius: "3px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
      border: "1px solid #0a0a0a",
    },
    diamond: {
      width: "28px",
      height: "28px",
      filter: "drop-shadow(0 0 4px rgba(255,255,255,0.3))",
    },
    scanlines: {
      position: "absolute",
      inset: 0,
      background:
        "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 2px)",
      pointerEvents: "none",
    },
    keypad: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "5px",
    },
    key: {
      width: "44px",
      height: "38px",
      background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
      border: "1px solid #333",
      borderRadius: "6px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "#fff",
      transition: "all 0.1s",
      boxShadow: "0 3px 0 #0a0a0a, inset 0 1px 0 rgba(255,255,255,0.08)",
    },
    keyNum: {
      fontSize: "13px",
      fontWeight: "700",
      textShadow: "0 1px 1px rgba(0,0,0,0.5)",
    },
    keySub: { fontSize: "5px", color: "#555", fontWeight: "500" },
    panelRight: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "10px",
      paddingBottom: "12px",
      paddingLeft: "14px",
      paddingRight: "24px",
      gap: "10px",
      minWidth: "105px",
      background: "linear-gradient(180deg, #2a2a2a 0%, #1d1d1d 100%)",
      borderTopRightRadius: "12px",
      borderBottomRightRadius: "12px",
      boxShadow: "inset 1px 0 0 rgba(255,255,255,0.04)",
    },
    scannerRow: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "70px",
      marginTop: "8px",
    },
    statusLight: {
      width: "56px",
      height: "6px",
      borderRadius: "3px",
      boxShadow: "0 0 12px rgba(239, 68, 68, 0.7)",
      transition: "background-color 0.3s, box-shadow 0.3s",
      border: "1px solid rgba(0,0,0,0.3)",
    },
    speaker: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      padding: "6px",
      background: "linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)",
      borderRadius: "4px",
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
    },
    speakerRow: { display: "flex", gap: "5px" },
    speakerHole: {
      width: "6px",
      height: "6px",
      backgroundColor: "#333",
      borderRadius: "50%",
      boxShadow: "inset 0 1px 1px rgba(0,0,0,0.6)",
    },
    fingerprintOuter: {
      width: "70px",
      height: "88px",
      background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 0 #0a0a0a, inset 0 1px 0 rgba(255,255,255,0.06)",
      border: "1px solid #333",
    },
    fingerprint: {
      width: "60px",
      height: "74px",
      backgroundColor: "#0a0a0a",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow:
        "inset 0 2px 6px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.03)",
      border: "1px solid #222",
    },
    fingerprintInner: {
      width: "48px",
      height: "60px",
      background: "linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "inset 0 0 15px rgba(0,0,0,0.5)",
      border: "1px solid #333",
    },
    fingerprintIcon: { width: "36px", height: "36px", color: "#3b82f6" },
    thriftex: { marginTop: "16px", textAlign: "center" },
    thrift: {
      color: "#666",
      fontSize: "8px",
      fontWeight: "600",
      letterSpacing: "0.1em",
    },
    ex: {
      color: "#ef4444",
      fontSize: "8px",
      fontWeight: "700",
      letterSpacing: "0.05em",
    },
    cable: {
      width: "40px",
      height: "4px",
      background:
        "linear-gradient(90deg, #2a2a2a 0%, #1a1a1a 50%, #2a2a2a 100%)",
      position: "relative",
      borderRadius: "2px",
    },
    hackDevice: {
      backgroundColor: "#0f0f12",
      borderRadius: "8px",
      padding: "12px",
      border: "2px solid #1f1f23",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
      position: "relative",
      minWidth: "240px",
    },
    hackHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
      paddingBottom: "8px",
      borderBottom: "1px solid #1f1f23",
    },
    hackBrand: {
      color: "#06b6d4",
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "0.1em",
    },
    signalBar: {
      width: "40px",
      height: "4px",
      backgroundColor: "#27272a",
      borderRadius: "2px",
      overflow: "hidden",
    },
    signalFill: {
      height: "100%",
      backgroundColor: "#22c55e",
      transition: "width 0.2s",
    },
    hackScreen: {
      backgroundColor: "#0a0a0c",
      borderRadius: "4px",
      padding: "12px",
    },
    hackRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "4px",
    },
    hackLabel: { color: "#71717a", fontSize: "10px", fontWeight: "600" },
    hackValue: { color: "#fff", fontSize: "10px", fontWeight: "700" },
    hackDivider: { height: "1px", backgroundColor: "#1f1f23", margin: "8px 0" },
    hackTarget: { marginBottom: "8px" },
    digitPoolsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "8px",
    },
    digitPoolColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    digitTile: {
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "4px",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      transition: "all 0.15s",
    },
    lockIndicator: {
      width: "20px",
      height: "3px",
      borderRadius: "2px",
      transition: "background-color 0.2s",
    },
    hintRow: { marginBottom: "8px", textAlign: "center", minHeight: "16px" },
    hintText: { color: "#f97316", fontSize: "10px", fontWeight: "600" },
    hackProgress: { marginBottom: "8px" },
    hackProgressBar: {
      width: "100%",
      height: "4px",
      backgroundColor: "#18181b",
      borderRadius: "2px",
      overflow: "hidden",
    },
    hackProgressFill: {
      height: "100%",
      backgroundColor: "#06b6d4",
      transition: "width 0.2s",
    },
    hackStatus: {
      textAlign: "center",
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "0.1em",
      marginTop: "8px",
    },
    pinContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "12px",
      marginBottom: "12px",
      marginTop: "8px",
    },
    pinDevice: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    pinLabel: {
      color: "#52525b",
      fontSize: "8px",
      fontWeight: "600",
      letterSpacing: "0.1em",
    },
    pinGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "6px",
    },
    pinButton: {
      width: "36px",
      height: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "6px",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      border: "2px solid",
      transition: "all 0.15s",
    },
    pinSpacer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
    },
    pinArrow: { color: "#52525b", fontSize: "12px" },
    hackFooter: { display: "flex", justifyContent: "space-between" },
    hackPort: { color: "#52525b", fontSize: "8px" },
    hackBaud: { color: "#52525b", fontSize: "8px" },
    hackClose: {
      position: "absolute",
      top: "8px",
      right: "8px",
      background: "none",
      border: "none",
      color: "#52525b",
      fontSize: "14px",
      cursor: "pointer",
      padding: "4px",
      lineHeight: 1,
    },
    shake: { animation: "shake 0.3s ease-in-out" },
    glitch: { filter: "hue-rotate(90deg) saturate(2)" },
    inputDisplay: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    inputLabel: { color: "#71717a", fontSize: "10px", fontWeight: "600" },
    inputCode: {
      color: "#22c55e",
      fontSize: "18px",
      fontWeight: "700",
      fontFamily: "monospace",
      letterSpacing: "0.2em",
    },
    breachText: {
      color: "#fff",
      fontSize: "12px",
      fontWeight: "700",
      fontFamily: "monospace",
      letterSpacing: "0.15em",
      textShadow: "0 0 10px rgba(239, 68, 68, 0.8)",
    },
    welcomeText: {
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      fontFamily: "monospace",
      letterSpacing: "0.1em",
      textShadow: "0 0 12px rgba(34, 197, 94, 0.8)",
    },
    revealedCodeContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px 0",
    },
    revealedCode: {
      color: "#22c55e",
      fontSize: "24px",
      fontWeight: "700",
      fontFamily: "monospace",
      letterSpacing: "0.3em",
      textShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
    },
    wireOverlay: {
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100,
    },
    wireContainer: {
      backgroundColor: "#0f0f12",
      borderRadius: "8px",
      padding: "12px",
      border: "2px solid #1f1f23",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)",
      position: "relative",
      minWidth: "280px",
    },
    wireHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
      paddingBottom: "8px",
      borderBottom: "1px solid #1f1f23",
    },
    wireBrand: {
      color: "#3b82f6",
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "0.1em",
    },
    wireScreen: {
      backgroundColor: "#0a0a0c",
      borderRadius: "4px",
      padding: "12px",
    },
    wireRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "4px",
    },
    wireLabel: { color: "#71717a", fontSize: "10px", fontWeight: "600" },
    wireValue: { color: "#fff", fontSize: "10px", fontWeight: "700" },
    wireDivider: { height: "1px", backgroundColor: "#1f1f23", margin: "8px 0" },
    wireTarget: { marginBottom: "8px" },
    wireSequenceDisplay: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "12px",
    },
    sequenceBox: {
      width: "24px",
      height: "24px",
      borderRadius: "4px",
      transition: "all 0.3s",
    },
    wireGridContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      marginBottom: "12px",
      marginTop: "8px",
    },
    wireTerminal: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    wireTerminalLabel: {
      color: "#52525b",
      fontSize: "8px",
      fontWeight: "600",
      letterSpacing: "0.1em",
    },
    wireGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
    },
    wireButton: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.15s",
    },
    wireIndicator: { width: "12px", height: "12px", borderRadius: "50%" },
    wireSpacer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    wireCheck: { color: "#22c55e", fontSize: "18px", fontWeight: "700" },
    wireProgress: { marginBottom: "8px" },
    wireProgressBar: {
      width: "100%",
      height: "4px",
      backgroundColor: "#18181b",
      borderRadius: "2px",
      overflow: "hidden",
    },
    wireProgressFill: {
      height: "100%",
      backgroundColor: "#3b82f6",
      transition: "width 0.2s",
    },
    wireStatus: {
      textAlign: "center",
      fontSize: "10px",
      fontWeight: "700",
      letterSpacing: "0.1em",
      marginTop: "8px",
    },
    wireFooter: {
      display: "flex",
      justifyContent: "space-between",
      borderTop: "1px solid #1f1f23",
      paddingTop: "8px",
      marginTop: "8px",
    },
    wirePort: { color: "#52525b", fontSize: "8px" },
    wireBaud: { color: "#52525b", fontSize: "8px" },
    wireClose: {
      position: "absolute",
      top: "8px",
      right: "8px",
      background: "none",
      border: "none",
      color: "#52525b",
      fontSize: "14px",
      cursor: "pointer",
      padding: "4px",
      lineHeight: 1,
    },
    freqDisplay: {
      marginBottom: "12px",
      backgroundColor: "#0a0a0c",
      borderRadius: "4px",
      padding: "8px",
      border: "1px solid #1f1f23",
    },
    freqWaveContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "40px",
    },
    freqWave: { width: "100%", height: "40px" },
    freqBars: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      gap: "20px",
      marginBottom: "12px",
    },
    freqBarContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "4px",
    },
    freqBarLabel: {
      color: "#52525b",
      fontSize: "8px",
      fontWeight: "600",
      letterSpacing: "0.1em",
    },
    freqBar: {
      width: "24px",
      height: "80px",
      backgroundColor: "#18181b",
      borderRadius: "4px",
      overflow: "hidden",
      display: "flex",
      alignItems: "flex-end",
      border: "1px solid #27272a",
    },
    freqBarFill: {
      width: "100%",
      transition: "height 0.15s, background-color 0.2s",
      borderRadius: "2px",
    },
    freqValue: { color: "#fff", fontSize: "12px", fontWeight: "700" },
    freqSpacer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "20px",
    },
    freqArrow: { color: "#52525b", fontSize: "12px" },
    freqControls: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "12px",
    },
    freqButton: {
      width: "48px",
      height: "36px",
      backgroundColor: "#18181b",
      border: "2px solid #27272a",
      borderRadius: "6px",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.15s",
    },
    freqMatchIndicator: {
      width: "100%",
      height: "4px",
      backgroundColor: "#18181b",
      borderRadius: "2px",
      overflow: "hidden",
      marginBottom: "8px",
    },
    freqMatchBar: {
      height: "100%",
      transition: "width 0.2s, background-color 0.2s",
    },
  };
  var nt = tt(document.getElementById("root"));
  nt.render(Oe(et, { children: Oe(ae, {}) }));
})();
