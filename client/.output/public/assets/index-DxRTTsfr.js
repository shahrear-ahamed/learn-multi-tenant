function V0(a, o) {
  for (var i = 0; i < o.length; i++) {
    const s = o[i]
    if (typeof s != 'string' && !Array.isArray(s)) {
      for (const c in s)
        if (c !== 'default' && !(c in a)) {
          const f = Object.getOwnPropertyDescriptor(s, c)
          f &&
            Object.defineProperty(
              a,
              c,
              f.get ? f : { enumerable: !0, get: () => s[c] },
            )
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(a, Symbol.toStringTag, { value: 'Module' }),
  )
}
;(function () {
  const o = document.createElement('link').relList
  if (o && o.supports && o.supports('modulepreload')) return
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) s(c)
  new MutationObserver((c) => {
    for (const f of c)
      if (f.type === 'childList')
        for (const m of f.addedNodes)
          m.tagName === 'LINK' && m.rel === 'modulepreload' && s(m)
  }).observe(document, { childList: !0, subtree: !0 })
  function i(c) {
    const f = {}
    return (
      c.integrity && (f.integrity = c.integrity),
      c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === 'use-credentials'
        ? (f.credentials = 'include')
        : c.crossOrigin === 'anonymous'
          ? (f.credentials = 'omit')
          : (f.credentials = 'same-origin'),
      f
    )
  }
  function s(c) {
    if (c.ep) return
    c.ep = !0
    const f = i(c)
    fetch(c.href, f)
  }
})()
function Kc(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, 'default')
    ? a.default
    : a
}
var cc = { exports: {} },
  Mi = {}
var cp
function X0() {
  if (cp) return Mi
  cp = 1
  var a = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.fragment')
  function i(s, c, f) {
    var m = null
    if (
      (f !== void 0 && (m = '' + f),
      c.key !== void 0 && (m = '' + c.key),
      'key' in c)
    ) {
      f = {}
      for (var h in c) h !== 'key' && (f[h] = c[h])
    } else f = c
    return (
      (c = f.ref),
      { $$typeof: a, type: s, key: m, ref: c !== void 0 ? c : null, props: f }
    )
  }
  return ((Mi.Fragment = o), (Mi.jsx = i), (Mi.jsxs = i), Mi)
}
var fp
function Q0() {
  return (fp || ((fp = 1), (cc.exports = X0())), cc.exports)
}
var _ = Q0()
const Yc = new WeakMap(),
  Z0 = new WeakMap(),
  zr = { current: [] }
let fc = !1,
  Ui = 0
const Li = new Set(),
  hr = new Map()
function ov(a) {
  for (const o of a) {
    if (zr.current.includes(o)) continue
    ;(zr.current.push(o), o.recompute())
    const i = Z0.get(o)
    if (i)
      for (const s of i) {
        const c = Yc.get(s)
        c?.length && ov(c)
      }
  }
}
function K0(a) {
  const o = { prevVal: a.prevState, currentVal: a.state }
  for (const i of a.listeners) i(o)
}
function P0(a) {
  const o = { prevVal: a.prevState, currentVal: a.state }
  for (const i of a.listeners) i(o)
}
function rv(a) {
  if (
    (Ui > 0 && !hr.has(a) && hr.set(a, a.prevState),
    Li.add(a),
    !(Ui > 0) && !fc)
  )
    try {
      for (fc = !0; Li.size > 0; ) {
        const o = Array.from(Li)
        Li.clear()
        for (const i of o) {
          const s = hr.get(i) ?? i.prevState
          ;((i.prevState = s), K0(i))
        }
        for (const i of o) {
          const s = Yc.get(i)
          s && (zr.current.push(i), ov(s))
        }
        for (const i of o) {
          const s = Yc.get(i)
          if (s) for (const c of s) P0(c)
        }
      }
    } finally {
      ;((fc = !1), (zr.current = []), hr.clear())
    }
}
function Bi(a) {
  Ui++
  try {
    a()
  } finally {
    if ((Ui--, Ui === 0)) {
      const o = Li.values().next().value
      o && rv(o)
    }
  }
}
function J0(a) {
  return typeof a == 'function'
}
class F0 {
  constructor(o, i) {
    ;((this.listeners = new Set()),
      (this.subscribe = (s) => {
        var c, f
        this.listeners.add(s)
        const m =
          (f = (c = this.options) == null ? void 0 : c.onSubscribe) == null
            ? void 0
            : f.call(c, s, this)
        return () => {
          ;(this.listeners.delete(s), m?.())
        }
      }),
      (this.prevState = o),
      (this.state = o),
      (this.options = i))
  }
  setState(o) {
    var i, s, c
    ;((this.prevState = this.state),
      (i = this.options) != null && i.updateFn
        ? (this.state = this.options.updateFn(this.prevState)(o))
        : J0(o)
          ? (this.state = o(this.prevState))
          : (this.state = o),
      (c = (s = this.options) == null ? void 0 : s.onUpdate) == null ||
        c.call(s),
      rv(this))
  }
}
const In = '__TSR_index',
  dp = 'popstate',
  hp = 'beforeunload'
function W0(a) {
  let o = a.getLocation()
  const i = new Set(),
    s = (m) => {
      ;((o = a.getLocation()), i.forEach((h) => h({ location: o, action: m })))
    },
    c = (m) => {
      ;(a.notifyOnIndexChange ?? !0) ? s(m) : (o = a.getLocation())
    },
    f = async ({ task: m, navigateOpts: h, ...p }) => {
      if (h?.ignoreBlocker ?? !1) {
        m()
        return
      }
      const b = a.getBlockers?.() ?? [],
        g = p.type === 'PUSH' || p.type === 'REPLACE'
      if (typeof document < 'u' && b.length && g)
        for (const S of b) {
          const T = Dr(p.path, p.state)
          if (
            await S.blockerFn({
              currentLocation: o,
              nextLocation: T,
              action: p.type,
            })
          ) {
            a.onBlocked?.()
            return
          }
        }
      m()
    }
  return {
    get location() {
      return o
    },
    get length() {
      return a.getLength()
    },
    subscribers: i,
    subscribe: (m) => (
      i.add(m),
      () => {
        i.delete(m)
      }
    ),
    push: (m, h, p) => {
      const v = o.state[In]
      ;((h = mp(v + 1, h)),
        f({
          task: () => {
            ;(a.pushState(m, h), s({ type: 'PUSH' }))
          },
          navigateOpts: p,
          type: 'PUSH',
          path: m,
          state: h,
        }))
    },
    replace: (m, h, p) => {
      const v = o.state[In]
      ;((h = mp(v, h)),
        f({
          task: () => {
            ;(a.replaceState(m, h), s({ type: 'REPLACE' }))
          },
          navigateOpts: p,
          type: 'REPLACE',
          path: m,
          state: h,
        }))
    },
    go: (m, h) => {
      f({
        task: () => {
          ;(a.go(m), c({ type: 'GO', index: m }))
        },
        navigateOpts: h,
        type: 'GO',
      })
    },
    back: (m) => {
      f({
        task: () => {
          ;(a.back(m?.ignoreBlocker ?? !1), c({ type: 'BACK' }))
        },
        navigateOpts: m,
        type: 'BACK',
      })
    },
    forward: (m) => {
      f({
        task: () => {
          ;(a.forward(m?.ignoreBlocker ?? !1), c({ type: 'FORWARD' }))
        },
        navigateOpts: m,
        type: 'FORWARD',
      })
    },
    canGoBack: () => o.state[In] !== 0,
    createHref: (m) => a.createHref(m),
    block: (m) => {
      if (!a.setBlockers) return () => {}
      const h = a.getBlockers?.() ?? []
      return (
        a.setBlockers([...h, m]),
        () => {
          const p = a.getBlockers?.() ?? []
          a.setBlockers?.(p.filter((v) => v !== m))
        }
      )
    },
    flush: () => a.flush?.(),
    destroy: () => a.destroy?.(),
    notify: s,
  }
}
function mp(a, o) {
  o || (o = {})
  const i = Pc()
  return { ...o, key: i, __TSR_key: i, [In]: a }
}
function $0(a) {
  const o = typeof document < 'u' ? window : void 0,
    i = o.history.pushState,
    s = o.history.replaceState
  let c = []
  const f = () => c,
    m = (B) => (c = B),
    h = (B) => B,
    p = () =>
      Dr(
        `${o.location.pathname}${o.location.search}${o.location.hash}`,
        o.history.state,
      )
  if (!o.history.state?.__TSR_key && !o.history.state?.key) {
    const B = Pc()
    o.history.replaceState({ [In]: 0, key: B, __TSR_key: B }, '')
  }
  let v = p(),
    b,
    g = !1,
    S = !1,
    T = !1,
    N = !1
  const M = () => v
  let O, U
  const Q = () => {
      O &&
        ((Y._ignoreSubscribers = !0),
        (O.isPush ? o.history.pushState : o.history.replaceState)(
          O.state,
          '',
          O.href,
        ),
        (Y._ignoreSubscribers = !1),
        (O = void 0),
        (U = void 0),
        (b = void 0))
    },
    K = (B, $, ut) => {
      const st = h($)
      ;(U || (b = v),
        (v = Dr($, ut)),
        (O = { href: st, state: ut, isPush: O?.isPush || B === 'push' }),
        U || (U = Promise.resolve().then(() => Q())))
    },
    X = (B) => {
      ;((v = p()), Y.notify({ type: B }))
    },
    W = async () => {
      if (S) {
        S = !1
        return
      }
      const B = p(),
        $ = B.state[In] - v.state[In],
        ut = $ === 1,
        st = $ === -1,
        vt = (!ut && !st) || g
      g = !1
      const Ht = vt ? 'GO' : st ? 'BACK' : 'FORWARD',
        jt = vt ? { type: 'GO', index: $ } : { type: st ? 'BACK' : 'FORWARD' }
      if (T) T = !1
      else {
        const At = f()
        if (typeof document < 'u' && At.length) {
          for (const j of At)
            if (
              await j.blockerFn({
                currentLocation: v,
                nextLocation: B,
                action: Ht,
              })
            ) {
              ;((S = !0), o.history.go(1), Y.notify(jt))
              return
            }
        }
      }
      ;((v = p()), Y.notify(jt))
    },
    G = (B) => {
      if (N) {
        N = !1
        return
      }
      let $ = !1
      const ut = f()
      if (typeof document < 'u' && ut.length)
        for (const st of ut) {
          const vt = st.enableBeforeUnload ?? !0
          if (vt === !0) {
            $ = !0
            break
          }
          if (typeof vt == 'function' && vt() === !0) {
            $ = !0
            break
          }
        }
      if ($) return (B.preventDefault(), (B.returnValue = ''))
    },
    Y = W0({
      getLocation: M,
      getLength: () => o.history.length,
      pushState: (B, $) => K('push', B, $),
      replaceState: (B, $) => K('replace', B, $),
      back: (B) => (B && (T = !0), (N = !0), o.history.back()),
      forward: (B) => {
        ;(B && (T = !0), (N = !0), o.history.forward())
      },
      go: (B) => {
        ;((g = !0), o.history.go(B))
      },
      createHref: (B) => h(B),
      flush: Q,
      destroy: () => {
        ;((o.history.pushState = i),
          (o.history.replaceState = s),
          o.removeEventListener(hp, G, { capture: !0 }),
          o.removeEventListener(dp, W))
      },
      onBlocked: () => {
        b && v !== b && (v = b)
      },
      getBlockers: f,
      setBlockers: m,
      notifyOnIndexChange: !1,
    })
  return (
    o.addEventListener(hp, G, { capture: !0 }),
    o.addEventListener(dp, W),
    (o.history.pushState = function (...B) {
      const $ = i.apply(o.history, B)
      return (Y._ignoreSubscribers || X('PUSH'), $)
    }),
    (o.history.replaceState = function (...B) {
      const $ = s.apply(o.history, B)
      return (Y._ignoreSubscribers || X('REPLACE'), $)
    }),
    Y
  )
}
function Dr(a, o) {
  const i = a.indexOf('#'),
    s = a.indexOf('?'),
    c = Pc()
  return {
    href: a,
    pathname: a.substring(
      0,
      i > 0 ? (s > 0 ? Math.min(i, s) : i) : s > 0 ? s : a.length,
    ),
    hash: i > -1 ? a.substring(i) : '',
    search: s > -1 ? a.slice(s, i === -1 ? void 0 : i) : '',
    state: o || { [In]: 0, key: c, __TSR_key: c },
  }
}
function Pc() {
  return (Math.random() + 1).toString(36).substring(7)
}
function Nr(a) {
  return a[a.length - 1]
}
function I0(a) {
  return typeof a == 'function'
}
function Wn(a, o) {
  return I0(a) ? a(o) : a
}
const tb = Object.prototype.hasOwnProperty
function ke(a, o) {
  if (a === o) return a
  const i = o,
    s = gp(a) && gp(i)
  if (!s && !(Lr(a) && Lr(i))) return i
  const c = s ? a : pp(a)
  if (!c) return i
  const f = s ? i : pp(i)
  if (!f) return i
  const m = c.length,
    h = f.length,
    p = s ? new Array(h) : {}
  let v = 0
  for (let b = 0; b < h; b++) {
    const g = s ? b : f[b],
      S = a[g],
      T = i[g]
    if (S === T) {
      ;((p[g] = S), (s ? b < m : tb.call(a, g)) && v++)
      continue
    }
    if (
      S === null ||
      T === null ||
      typeof S != 'object' ||
      typeof T != 'object'
    ) {
      p[g] = T
      continue
    }
    const N = ke(S, T)
    ;((p[g] = N), N === S && v++)
  }
  return m === h && v === m ? a : p
}
function pp(a) {
  const o = [],
    i = Object.getOwnPropertyNames(a)
  for (const c of i) {
    if (!Object.prototype.propertyIsEnumerable.call(a, c)) return !1
    o.push(c)
  }
  const s = Object.getOwnPropertySymbols(a)
  for (const c of s) {
    if (!Object.prototype.propertyIsEnumerable.call(a, c)) return !1
    o.push(c)
  }
  return o
}
function Lr(a) {
  if (!vp(a)) return !1
  const o = a.constructor
  if (typeof o > 'u') return !0
  const i = o.prototype
  return !(!vp(i) || !i.hasOwnProperty('isPrototypeOf'))
}
function vp(a) {
  return Object.prototype.toString.call(a) === '[object Object]'
}
function gp(a) {
  return Array.isArray(a) && a.length === Object.keys(a).length
}
function Ea(a, o, i) {
  if (a === o) return !0
  if (typeof a != typeof o) return !1
  if (Array.isArray(a) && Array.isArray(o)) {
    if (a.length !== o.length) return !1
    for (let s = 0, c = a.length; s < c; s++) if (!Ea(a[s], o[s], i)) return !1
    return !0
  }
  if (Lr(a) && Lr(o)) {
    const s = i?.ignoreUndefined ?? !0
    if (i?.partial) {
      for (const m in o)
        if ((!s || o[m] !== void 0) && !Ea(a[m], o[m], i)) return !1
      return !0
    }
    let c = 0
    if (!s) c = Object.keys(a).length
    else for (const m in a) a[m] !== void 0 && c++
    let f = 0
    for (const m in o)
      if ((!s || o[m] !== void 0) && (f++, f > c || !Ea(a[m], o[m], i)))
        return !1
    return c === f
  }
  return !1
}
function Cl(a) {
  let o, i
  const s = new Promise((c, f) => {
    ;((o = c), (i = f))
  })
  return (
    (s.status = 'pending'),
    (s.resolve = (c) => {
      ;((s.status = 'resolved'), (s.value = c), o(c), a?.(c))
    }),
    (s.reject = (c) => {
      ;((s.status = 'rejected'), i(c))
    }),
    s
  )
}
function ta(a) {
  return !!(a && typeof a == 'object' && typeof a.then == 'function')
}
function yp(a) {
  try {
    return decodeURI(a)
  } catch {
    return a.replaceAll(/%[0-9A-F]{2}/gi, (o) => {
      try {
        return decodeURI(o)
      } catch {
        return o
      }
    })
  }
}
function bp(a, o) {
  if (!a) return a
  const i = /%25|%5C/gi
  let s = 0,
    c = '',
    f
  for (; (f = i.exec(a)) !== null; )
    ((c += yp(a.slice(s, f.index)) + f[0]), (s = i.lastIndex))
  return c + yp(s ? a.slice(s) : a)
}
var eb = 'Invariant failed'
function Sn(a, o) {
  if (!a) throw new Error(eb)
}
function jr(a) {
  const o = new Map()
  let i, s
  const c = (f) => {
    f.next &&
      (f.prev
        ? ((f.prev.next = f.next),
          (f.next.prev = f.prev),
          (f.next = void 0),
          s && ((s.next = f), (f.prev = s)))
        : ((f.next.prev = void 0),
          (i = f.next),
          (f.next = void 0),
          s && ((f.prev = s), (s.next = f))),
      (s = f))
  }
  return {
    get(f) {
      const m = o.get(f)
      if (m) return (c(m), m.value)
    },
    set(f, m) {
      if (o.size >= a && i) {
        const p = i
        ;(o.delete(p.key),
          p.next && ((i = p.next), (p.next.prev = void 0)),
          p === s && (s = void 0))
      }
      const h = o.get(f)
      if (h) ((h.value = m), c(h))
      else {
        const p = { key: f, value: m, prev: s }
        ;(s && (s.next = p), (s = p), i || (i = p), o.set(f, p))
      }
    },
    clear() {
      ;(o.clear(), (i = void 0), (s = void 0))
    },
  }
}
const Al = 0,
  Ca = 1,
  Aa = 2,
  ki = 3,
  nb = /^([^{]*)\{\$([a-zA-Z_$][a-zA-Z0-9_$]*)\}([^}]*)$/,
  ab = /^([^{]*)\{-\$([a-zA-Z_$][a-zA-Z0-9_$]*)\}([^}]*)$/,
  lb = /^([^{]*)\{\$\}([^}]*)$/
function Jc(a, o, i = new Uint16Array(6)) {
  const s = a.indexOf('/', o),
    c = s === -1 ? a.length : s,
    f = a.substring(o, c)
  if (!f || !f.includes('$'))
    return (
      (i[0] = Al),
      (i[1] = o),
      (i[2] = o),
      (i[3] = c),
      (i[4] = c),
      (i[5] = c),
      i
    )
  if (f === '$') {
    const v = a.length
    return (
      (i[0] = Aa),
      (i[1] = o),
      (i[2] = o),
      (i[3] = v),
      (i[4] = v),
      (i[5] = v),
      i
    )
  }
  if (f.charCodeAt(0) === 36)
    return (
      (i[0] = Ca),
      (i[1] = o),
      (i[2] = o + 1),
      (i[3] = c),
      (i[4] = c),
      (i[5] = c),
      i
    )
  const m = f.match(lb)
  if (m) {
    const b = m[1].length
    return (
      (i[0] = Aa),
      (i[1] = o + b),
      (i[2] = o + b + 1),
      (i[3] = o + b + 2),
      (i[4] = o + b + 3),
      (i[5] = a.length),
      i
    )
  }
  const h = f.match(ab)
  if (h) {
    const v = h[1],
      b = h[2],
      g = h[3],
      S = v.length
    return (
      (i[0] = ki),
      (i[1] = o + S),
      (i[2] = o + S + 3),
      (i[3] = o + S + 3 + b.length),
      (i[4] = c - g.length),
      (i[5] = c),
      i
    )
  }
  const p = f.match(nb)
  if (p) {
    const v = p[1],
      b = p[2],
      g = p[3],
      S = v.length
    return (
      (i[0] = Ca),
      (i[1] = o + S),
      (i[2] = o + S + 2),
      (i[3] = o + S + 2 + b.length),
      (i[4] = c - g.length),
      (i[5] = c),
      i
    )
  }
  return (
    (i[0] = Al),
    (i[1] = o),
    (i[2] = o),
    (i[3] = c),
    (i[4] = c),
    (i[5] = c),
    i
  )
}
function Vr(a, o, i, s, c, f, m) {
  m?.(i)
  let h = s
  {
    const p = i.fullPath ?? i.from,
      v = p.length,
      b = i.options?.caseSensitive ?? a
    for (; h < v; ) {
      const g = Jc(p, h, o)
      let S
      const T = h,
        N = g[5]
      switch (((h = N + 1), f++, g[0])) {
        case Al: {
          const O = p.substring(g[2], g[3])
          if (b) {
            const U = c.static?.get(O)
            if (U) S = U
            else {
              c.static ??= new Map()
              const Q = qi(i.fullPath ?? i.from)
              ;((Q.parent = c), (Q.depth = f), (S = Q), c.static.set(O, Q))
            }
          } else {
            const U = O.toLowerCase(),
              Q = c.staticInsensitive?.get(U)
            if (Q) S = Q
            else {
              c.staticInsensitive ??= new Map()
              const K = qi(i.fullPath ?? i.from)
              ;((K.parent = c),
                (K.depth = f),
                (S = K),
                c.staticInsensitive.set(U, K))
            }
          }
          break
        }
        case Ca: {
          const O = p.substring(T, g[1]),
            U = p.substring(g[4], N),
            Q = b && !!(O || U),
            K = O ? (Q ? O : O.toLowerCase()) : void 0,
            X = U ? (Q ? U : U.toLowerCase()) : void 0,
            W = c.dynamic?.find(
              (G) => G.caseSensitive === Q && G.prefix === K && G.suffix === X,
            )
          if (W) S = W
          else {
            const G = hc(Ca, i.fullPath ?? i.from, Q, K, X)
            ;((S = G),
              (G.depth = f),
              (G.parent = c),
              (c.dynamic ??= []),
              c.dynamic.push(G))
          }
          break
        }
        case ki: {
          const O = p.substring(T, g[1]),
            U = p.substring(g[4], N),
            Q = b && !!(O || U),
            K = O ? (Q ? O : O.toLowerCase()) : void 0,
            X = U ? (Q ? U : U.toLowerCase()) : void 0,
            W = c.optional?.find(
              (G) => G.caseSensitive === Q && G.prefix === K && G.suffix === X,
            )
          if (W) S = W
          else {
            const G = hc(ki, i.fullPath ?? i.from, Q, K, X)
            ;((S = G),
              (G.parent = c),
              (G.depth = f),
              (c.optional ??= []),
              c.optional.push(G))
          }
          break
        }
        case Aa: {
          const O = p.substring(T, g[1]),
            U = p.substring(g[4], N),
            Q = b && !!(O || U),
            K = O ? (Q ? O : O.toLowerCase()) : void 0,
            X = U ? (Q ? U : U.toLowerCase()) : void 0,
            W = hc(Aa, i.fullPath ?? i.from, Q, K, X)
          ;((S = W),
            (W.parent = c),
            (W.depth = f),
            (c.wildcard ??= []),
            c.wildcard.push(W))
        }
      }
      c = S
    }
    if ((i.path || !i.children) && !i.isRoot) {
      const g = p.endsWith('/')
      ;(g || (c.notFound = i),
        (!c.route || (!c.isIndex && g)) &&
          ((c.route = i), (c.fullPath = i.fullPath ?? i.from)),
        (c.isIndex ||= g))
    }
  }
  if (i.children) for (const p of i.children) Vr(a, o, p, h, c, f, m)
}
function dc(a, o) {
  if (a.prefix && o.prefix && a.prefix !== o.prefix) {
    if (a.prefix.startsWith(o.prefix)) return -1
    if (o.prefix.startsWith(a.prefix)) return 1
  }
  if (a.suffix && o.suffix && a.suffix !== o.suffix) {
    if (a.suffix.endsWith(o.suffix)) return -1
    if (o.suffix.endsWith(a.suffix)) return 1
  }
  return a.prefix && !o.prefix
    ? -1
    : !a.prefix && o.prefix
      ? 1
      : a.suffix && !o.suffix
        ? -1
        : !a.suffix && o.suffix
          ? 1
          : a.caseSensitive && !o.caseSensitive
            ? -1
            : !a.caseSensitive && o.caseSensitive
              ? 1
              : 0
}
function xa(a) {
  if (a.static) for (const o of a.static.values()) xa(o)
  if (a.staticInsensitive) for (const o of a.staticInsensitive.values()) xa(o)
  if (a.dynamic?.length) {
    a.dynamic.sort(dc)
    for (const o of a.dynamic) xa(o)
  }
  if (a.optional?.length) {
    a.optional.sort(dc)
    for (const o of a.optional) xa(o)
  }
  if (a.wildcard?.length) {
    a.wildcard.sort(dc)
    for (const o of a.wildcard) xa(o)
  }
}
function qi(a) {
  return {
    kind: Al,
    depth: 0,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath: a,
    parent: null,
    isIndex: !1,
    notFound: null,
  }
}
function hc(a, o, i, s, c) {
  return {
    kind: a,
    depth: 0,
    static: null,
    staticInsensitive: null,
    dynamic: null,
    optional: null,
    wildcard: null,
    route: null,
    fullPath: o,
    parent: null,
    isIndex: !1,
    notFound: null,
    caseSensitive: i,
    prefix: s,
    suffix: c,
  }
}
function ib(a, o) {
  const i = qi('/'),
    s = new Uint16Array(6)
  for (const c of a) Vr(!1, s, c, 1, i, 0)
  ;(xa(i), (o.masksTree = i), (o.flatCache = jr(1e3)))
}
function ob(a, o) {
  a ||= '/'
  const i = o.flatCache.get(a)
  if (i) return i
  const s = Fc(a, o.masksTree)
  return (o.flatCache.set(a, s), s)
}
function rb(a, o, i, s, c) {
  ;((a ||= '/'), (s ||= '/'))
  const f = o ? `case\0${a}` : a
  let m = c.singleCache.get(f)
  if (!m) {
    m = qi('/')
    const h = new Uint16Array(6)
    ;(Vr(o, h, { from: a }, 1, m, 0), c.singleCache.set(f, m))
  }
  return Fc(s, m, i)
}
function sb(a, o, i = !1) {
  const s = i ? a : `nofuzz\0${a}`,
    c = o.matchCache.get(s)
  if (c !== void 0) return c
  a ||= '/'
  const f = Fc(a, o.segmentTree, i)
  return (f && (f.branch = db(f.route)), o.matchCache.set(s, f), f)
}
function ub(a) {
  return a === '/' ? a : a.replace(/\/{1,}$/, '')
}
function cb(a, o = !1, i) {
  const s = qi(a.fullPath),
    c = new Uint16Array(6),
    f = {},
    m = {}
  let h = 0
  return (
    Vr(o, c, a, 1, s, 0, (v) => {
      if (
        (i?.(v, h),
        Sn(!(v.id in f), `Duplicate routes found with id: ${String(v.id)}`),
        (f[v.id] = v),
        h !== 0 && v.path)
      ) {
        const b = ub(v.fullPath)
        ;(!m[b] || v.fullPath.endsWith('/')) && (m[b] = v)
      }
      h++
    }),
    xa(s),
    {
      processedTree: {
        segmentTree: s,
        singleCache: jr(1e3),
        matchCache: jr(1e3),
        flatCache: null,
        masksTree: null,
      },
      routesById: f,
      routesByPath: m,
    }
  )
}
function Fc(a, o, i = !1) {
  const s = a.split('/'),
    c = mb(a, s, o, i)
  if (!c) return null
  const f = fb(a, s, c),
    m = '**' in c
  return (
    m && (f['**'] = c['**']),
    { route: m ? (c.node.notFound ?? c.node.route) : c.node.route, params: f }
  )
}
function fb(a, o, i) {
  const s = hb(i.node)
  let c = null
  const f = {}
  for (let m = 0, h = 0, p = 0; h < s.length; m++, h++, p++) {
    const v = s[h],
      b = o[m],
      g = p
    if ((b && (p += b.length), v.kind === Ca)) {
      c ??= i.node.fullPath.split('/')
      const S = c[h],
        T = v.prefix?.length ?? 0
      if (S.charCodeAt(T) === 123) {
        const M = v.suffix?.length ?? 0,
          O = S.substring(T + 2, S.length - M - 1),
          U = b.substring(T, b.length - M)
        f[O] = decodeURIComponent(U)
      } else {
        const M = S.substring(1)
        f[M] = decodeURIComponent(b)
      }
    } else if (v.kind === ki) {
      if (i.skipped & (1 << h)) {
        m--
        continue
      }
      c ??= i.node.fullPath.split('/')
      const S = c[h],
        T = v.prefix?.length ?? 0,
        N = v.suffix?.length ?? 0,
        M = S.substring(T + 3, S.length - N - 1),
        O = v.suffix || v.prefix ? b.substring(T, b.length - N) : b
      O && (f[M] = decodeURIComponent(O))
    } else if (v.kind === Aa) {
      const S = v,
        T = a.substring(
          g + (S.prefix?.length ?? 0),
          a.length - (S.suffix?.length ?? 0),
        ),
        N = decodeURIComponent(T)
      ;((f['*'] = N), (f._splat = N))
      break
    }
  }
  return f
}
function db(a) {
  const o = [a]
  for (; a.parentRoute; ) ((a = a.parentRoute), o.push(a))
  return (o.reverse(), o)
}
function hb(a) {
  const o = Array(a.depth + 1)
  do ((o[a.depth] = a), (a = a.parent))
  while (a)
  return o
}
function mb(a, o, i, s) {
  const c = !Nr(o),
    f = c && a !== '/',
    m = o.length - (c ? 1 : 0),
    h = [
      {
        node: i,
        index: 1,
        skipped: 0,
        depth: 1,
        statics: 1,
        dynamics: 0,
        optionals: 0,
      },
    ]
  let p = null,
    v = null,
    b = null
  for (; h.length; ) {
    const g = h.pop()
    let {
      node: S,
      index: T,
      skipped: N,
      depth: M,
      statics: O,
      dynamics: U,
      optionals: Q,
    } = g
    s && S.notFound && mr(v, g) && (v = g)
    const K = T === m
    if (K) {
      if (
        S.route &&
        (!f || S.isIndex) &&
        (mr(b, g) && (b = g), O === m && S.isIndex)
      )
        return b
      if (!S.optional && !S.wildcard) continue
    }
    const X = K ? void 0 : o[T]
    let W
    if (S.wildcard && mr(p, g))
      for (const G of S.wildcard) {
        const { prefix: Y, suffix: B } = G
        if (
          !(
            Y &&
            (K ||
              !(G.caseSensitive ? X : (W ??= X.toLowerCase())).startsWith(Y))
          )
        ) {
          if (B) {
            if (K) continue
            const $ = o.slice(T).join('/').slice(-B.length)
            if ((G.caseSensitive ? $ : $.toLowerCase()) !== B) continue
          }
          p = {
            node: G,
            index: T,
            skipped: N,
            depth: M,
            statics: O,
            dynamics: U,
            optionals: Q,
          }
          break
        }
      }
    if (S.optional) {
      const G = N | (1 << M),
        Y = M + 1
      for (let B = S.optional.length - 1; B >= 0; B--) {
        const $ = S.optional[B]
        h.push({
          node: $,
          index: T,
          skipped: G,
          depth: Y,
          statics: O,
          dynamics: U,
          optionals: Q,
        })
      }
      if (!K)
        for (let B = S.optional.length - 1; B >= 0; B--) {
          const $ = S.optional[B],
            { prefix: ut, suffix: st } = $
          if (ut || st) {
            const vt = $.caseSensitive ? X : (W ??= X.toLowerCase())
            if ((ut && !vt.startsWith(ut)) || (st && !vt.endsWith(st))) continue
          }
          h.push({
            node: $,
            index: T + 1,
            skipped: N,
            depth: Y,
            statics: O,
            dynamics: U,
            optionals: Q + 1,
          })
        }
    }
    if (!K && S.dynamic && X)
      for (let G = S.dynamic.length - 1; G >= 0; G--) {
        const Y = S.dynamic[G],
          { prefix: B, suffix: $ } = Y
        if (B || $) {
          const ut = Y.caseSensitive ? X : (W ??= X.toLowerCase())
          if ((B && !ut.startsWith(B)) || ($ && !ut.endsWith($))) continue
        }
        h.push({
          node: Y,
          index: T + 1,
          skipped: N,
          depth: M + 1,
          statics: O,
          dynamics: U + 1,
          optionals: Q,
        })
      }
    if (!K && S.staticInsensitive) {
      const G = S.staticInsensitive.get((W ??= X.toLowerCase()))
      G &&
        h.push({
          node: G,
          index: T + 1,
          skipped: N,
          depth: M + 1,
          statics: O + 1,
          dynamics: U,
          optionals: Q,
        })
    }
    if (!K && S.static) {
      const G = S.static.get(X)
      G &&
        h.push({
          node: G,
          index: T + 1,
          skipped: N,
          depth: M + 1,
          statics: O + 1,
          dynamics: U,
          optionals: Q,
        })
    }
  }
  if (b && p) return mr(p, b) ? b : p
  if (b) return b
  if (p) return p
  if (s && v) {
    let g = v.index
    for (let T = 0; T < v.index; T++) g += o[T].length
    const S = g === a.length ? '/' : a.slice(g)
    return { node: v.node, skipped: v.skipped, '**': decodeURIComponent(S) }
  }
  return null
}
function mr(a, o) {
  return a
    ? o.statics > a.statics ||
        (o.statics === a.statics &&
          (o.dynamics > a.dynamics ||
            (o.dynamics === a.dynamics &&
              (o.optionals > a.optionals ||
                (o.optionals === a.optionals &&
                  (o.node.isIndex > a.node.isIndex ||
                    (o.node.isIndex === a.node.isIndex &&
                      o.depth > a.depth)))))))
    : !0
}
function Ar(a) {
  return Wc(a.filter((o) => o !== void 0).join('/'))
}
function Wc(a) {
  return a.replace(/\/{2,}/g, '/')
}
function sv(a) {
  return a === '/' ? a : a.replace(/^\/{1,}/, '')
}
function _a(a) {
  const o = a.length
  return o > 1 && a[o - 1] === '/' ? a.replace(/\/{1,}$/, '') : a
}
function uv(a) {
  return _a(sv(a))
}
function Ur(a, o) {
  return a?.endsWith('/') && a !== '/' && a !== `${o}/` ? a.slice(0, -1) : a
}
function pb(a, o, i) {
  return Ur(a, i) === Ur(o, i)
}
function vb({ base: a, to: o, trailingSlash: i = 'never', cache: s }) {
  const c = o.startsWith('/'),
    f = !c && o === '.'
  let m
  if (s) {
    m = c ? o : f ? a : a + '\0' + o
    const g = s.get(m)
    if (g) return g
  }
  let h
  if (f) h = a.split('/')
  else if (c) h = o.split('/')
  else {
    for (h = a.split('/'); h.length > 1 && Nr(h) === ''; ) h.pop()
    const g = o.split('/')
    for (let S = 0, T = g.length; S < T; S++) {
      const N = g[S]
      N === ''
        ? S
          ? S === T - 1 && h.push(N)
          : (h = [N])
        : N === '..'
          ? h.pop()
          : N === '.' || h.push(N)
    }
  }
  h.length > 1 &&
    (Nr(h) === '' ? i === 'never' && h.pop() : i === 'always' && h.push(''))
  let p,
    v = ''
  for (let g = 0; g < h.length; g++) {
    g > 0 && (v += '/')
    const S = h[g]
    if (!S) continue
    p = Jc(S, 0, p)
    const T = p[0]
    if (T === Al) {
      v += S
      continue
    }
    const N = p[5],
      M = S.substring(0, p[1]),
      O = S.substring(p[4], N),
      U = S.substring(p[2], p[3])
    T === Ca
      ? (v += M || O ? `${M}{$${U}}${O}` : `$${U}`)
      : T === Aa
        ? (v += M || O ? `${M}{$}${O}` : '$')
        : (v += `${M}{-$${U}}${O}`)
  }
  v = Wc(v)
  const b = v || '/'
  return (m && s && s.set(m, b), b)
}
function mc(a, o, i) {
  const s = o[a]
  return typeof s != 'string' ? s : a === '_splat' ? encodeURI(s) : gb(s, i)
}
function pc({ path: a, params: o, decodeCharMap: i }) {
  let s = !1
  const c = {}
  if (!a || a === '/')
    return { interpolatedPath: '/', usedParams: c, isMissingParams: s }
  if (!a.includes('$'))
    return { interpolatedPath: a, usedParams: c, isMissingParams: s }
  const f = a.length
  let m = 0,
    h,
    p = ''
  for (; m < f; ) {
    const b = m
    h = Jc(a, b, h)
    const g = h[5]
    if (((m = g + 1), b === g)) continue
    const S = h[0]
    if (S === Al) {
      p += '/' + a.substring(b, g)
      continue
    }
    if (S === Aa) {
      const T = o._splat
      ;((c._splat = T), (c['*'] = T))
      const N = a.substring(b, h[1]),
        M = a.substring(h[4], g)
      if (!T) {
        ;((s = !0), (N || M) && (p += '/' + N + M))
        continue
      }
      const O = mc('_splat', o, i)
      p += '/' + N + O + M
      continue
    }
    if (S === Ca) {
      const T = a.substring(h[2], h[3])
      ;(!s && !(T in o) && (s = !0), (c[T] = o[T]))
      const N = a.substring(b, h[1]),
        M = a.substring(h[4], g),
        O = mc(T, o, i) ?? 'undefined'
      p += '/' + N + O + M
      continue
    }
    if (S === ki) {
      const T = a.substring(h[2], h[3]),
        N = o[T]
      if (N == null) continue
      c[T] = N
      const M = a.substring(b, h[1]),
        O = a.substring(h[4], g),
        U = mc(T, o, i) ?? ''
      p += '/' + M + U + O
      continue
    }
  }
  return (
    a.endsWith('/') && (p += '/'),
    { usedParams: c, interpolatedPath: p || '/', isMissingParams: s }
  )
}
function gb(a, o) {
  let i = encodeURIComponent(a)
  if (o) for (const [s, c] of o) i = i.replaceAll(s, c)
  return i
}
function qe(a) {
  return !!a?.isNotFound
}
function yb() {
  try {
    if (typeof window < 'u' && typeof window.sessionStorage == 'object')
      return window.sessionStorage
  } catch {}
}
const Br = 'tsr-scroll-restoration-v1_3',
  bb = (a, o) => {
    let i
    return (...s) => {
      i ||
        (i = setTimeout(() => {
          ;(a(...s), (i = null))
        }, o))
    }
  }
function Sb() {
  const a = yb()
  if (!a) return null
  const o = a.getItem(Br)
  let i = o ? JSON.parse(o) : {}
  return {
    state: i,
    set: (s) => ((i = Wn(s, i) || i), a.setItem(Br, JSON.stringify(i))),
  }
}
const pr = Sb(),
  Gc = (a) => a.state.__TSR_key || a.href
function xb(a) {
  const o = []
  let i
  for (; (i = a.parentNode); )
    (o.push(
      `${a.tagName}:nth-child(${Array.prototype.indexOf.call(i.children, a) + 1})`,
    ),
      (a = i))
  return `${o.reverse().join(' > ')}`.toLowerCase()
}
let Hr = !1
function cv({
  storageKey: a,
  key: o,
  behavior: i,
  shouldScrollRestoration: s,
  scrollToTopSelectors: c,
  location: f,
}) {
  let m
  try {
    m = JSON.parse(sessionStorage.getItem(a) || '{}')
  } catch (v) {
    console.error(v)
    return
  }
  const h = o || window.history.state?.__TSR_key,
    p = m[h]
  Hr = !0
  t: {
    if (s && p && Object.keys(p).length > 0) {
      for (const g in p) {
        const S = p[g]
        if (g === 'window')
          window.scrollTo({ top: S.scrollY, left: S.scrollX, behavior: i })
        else if (g) {
          const T = document.querySelector(g)
          T && ((T.scrollLeft = S.scrollX), (T.scrollTop = S.scrollY))
        }
      }
      break t
    }
    const v = (f ?? window.location).hash.split('#', 2)[1]
    if (v) {
      const g = window.history.state?.__hashScrollIntoViewOptions ?? !0
      if (g) {
        const S = document.getElementById(v)
        S && S.scrollIntoView(g)
      }
      break t
    }
    const b = { top: 0, left: 0, behavior: i }
    if ((window.scrollTo(b), c))
      for (const g of c) {
        if (g === 'window') continue
        const S = typeof g == 'function' ? g() : document.querySelector(g)
        S && S.scrollTo(b)
      }
  }
  Hr = !1
}
function Eb(a, o) {
  if (
    (!pr && !a.isServer) ||
    ((a.options.scrollRestoration ?? !1) && (a.isScrollRestoring = !0),
    a.isServer || a.isScrollRestorationSetup || !pr)
  )
    return
  ;((a.isScrollRestorationSetup = !0), (Hr = !1))
  const s = a.options.getScrollRestorationKey || Gc
  window.history.scrollRestoration = 'manual'
  const c = (f) => {
    if (Hr || !a.isScrollRestoring) return
    let m = ''
    if (f.target === document || f.target === window) m = 'window'
    else {
      const p = f.target.getAttribute('data-scroll-restoration-id')
      p ? (m = `[data-scroll-restoration-id="${p}"]`) : (m = xb(f.target))
    }
    const h = s(a.state.location)
    pr.set((p) => {
      const v = (p[h] ||= {}),
        b = (v[m] ||= {})
      if (m === 'window')
        ((b.scrollX = window.scrollX || 0), (b.scrollY = window.scrollY || 0))
      else if (m) {
        const g = document.querySelector(m)
        g && ((b.scrollX = g.scrollLeft || 0), (b.scrollY = g.scrollTop || 0))
      }
      return p
    })
  }
  ;(typeof document < 'u' &&
    document.addEventListener('scroll', bb(c, 100), !0),
    a.subscribe('onRendered', (f) => {
      const m = s(f.toLocation)
      if (!a.resetNextScroll) {
        a.resetNextScroll = !0
        return
      }
      ;(typeof a.options.scrollRestoration == 'function' &&
        !a.options.scrollRestoration({ location: a.latestLocation })) ||
        (cv({
          storageKey: Br,
          key: m,
          behavior: a.options.scrollRestorationBehavior,
          shouldScrollRestoration: a.isScrollRestoring,
          scrollToTopSelectors: a.options.scrollToTopSelectors,
          location: a.history.location,
        }),
        a.isScrollRestoring && pr.set((h) => ((h[m] ||= {}), h)))
    }))
}
function _b(a) {
  if (typeof document < 'u' && document.querySelector) {
    const o = a.state.location.state.__hashScrollIntoViewOptions ?? !0
    if (o && a.state.location.hash !== '') {
      const i = document.getElementById(a.state.location.hash)
      i && i.scrollIntoView(o)
    }
  }
}
function Rb(a, o = String) {
  const i = new URLSearchParams()
  for (const s in a) {
    const c = a[s]
    c !== void 0 && i.set(s, o(c))
  }
  return i.toString()
}
function vc(a) {
  return a
    ? a === 'false'
      ? !1
      : a === 'true'
        ? !0
        : +a * 0 === 0 && +a + '' === a
          ? +a
          : a
    : ''
}
function Tb(a) {
  const o = new URLSearchParams(a),
    i = {}
  for (const [s, c] of o.entries()) {
    const f = i[s]
    f == null
      ? (i[s] = vc(c))
      : Array.isArray(f)
        ? f.push(vc(c))
        : (i[s] = [f, vc(c)])
  }
  return i
}
const Cb = Mb(JSON.parse),
  Ab = Ob(JSON.stringify, JSON.parse)
function Mb(a) {
  return (o) => {
    o[0] === '?' && (o = o.substring(1))
    const i = Tb(o)
    for (const s in i) {
      const c = i[s]
      if (typeof c == 'string')
        try {
          i[s] = a(c)
        } catch {}
    }
    return i
  }
}
function Ob(a, o) {
  const i = typeof o == 'function'
  function s(c) {
    if (typeof c == 'object' && c !== null)
      try {
        return a(c)
      } catch {}
    else if (i && typeof c == 'string')
      try {
        return (o(c), a(c))
      } catch {}
    return c
  }
  return (c) => {
    const f = Rb(c, s)
    return f ? `?${f}` : ''
  }
}
const Ce = '__root__'
function fv(a) {
  if (
    ((a.statusCode = a.statusCode || a.code || 307),
    !a.reloadDocument && typeof a.href == 'string')
  )
    try {
      ;(new URL(a.href), (a.reloadDocument = !0))
    } catch {}
  const o = new Headers(a.headers)
  a.href && o.get('Location') === null && o.set('Location', a.href)
  const i = new Response(null, { status: a.statusCode, headers: o })
  if (((i.options = a), a.throw)) throw i
  return i
}
function Xe(a) {
  return a instanceof Response && !!a.options
}
const Mr = (a) => {
    if (!a.rendered) return ((a.rendered = !0), a.onReady?.())
  },
  Xr = (a, o) =>
    !!(a.preload && !a.router.state.matches.some((i) => i.id === o)),
  $c = (a, o, i = !0) => {
    const s = { ...(a.router.options.context ?? {}) },
      c = i ? o : o - 1
    for (let f = 0; f <= c; f++) {
      const m = a.matches[f]
      if (!m) continue
      const h = a.router.getMatch(m.id)
      h && Object.assign(s, h.__routeContext, h.__beforeLoadContext)
    }
    return s
  },
  dv = (a, o) => {
    const i = a.router.routesById[o.routeId ?? ''] ?? a.router.routeTree
    ;(!i.options.notFoundComponent &&
      a.router.options?.defaultNotFoundComponent &&
      (i.options.notFoundComponent = a.router.options.defaultNotFoundComponent),
      Sn(i.options.notFoundComponent))
    const s = a.matches.find((c) => c.routeId === i.id)
    ;(Sn(s, 'Could not find match for route: ' + i.id),
      a.updateMatch(s.id, (c) => ({
        ...c,
        status: 'notFound',
        error: o,
        isFetching: !1,
      })),
      o.routerCode === 'BEFORE_LOAD' &&
        i.parentRoute &&
        ((o.routeId = i.parentRoute.id), dv(a, o)))
  },
  $n = (a, o, i) => {
    if (!(!Xe(i) && !qe(i))) {
      if (Xe(i) && i.redirectHandled && !i.options.reloadDocument) throw i
      if (o) {
        ;(o._nonReactive.beforeLoadPromise?.resolve(),
          o._nonReactive.loaderPromise?.resolve(),
          (o._nonReactive.beforeLoadPromise = void 0),
          (o._nonReactive.loaderPromise = void 0))
        const s = Xe(i) ? 'redirected' : 'notFound'
        ;((o._nonReactive.error = i),
          a.updateMatch(o.id, (c) => ({
            ...c,
            status: s,
            isFetching: !1,
            error: i,
          })),
          qe(i) && !i.routeId && (i.routeId = o.routeId),
          o._nonReactive.loadPromise?.resolve())
      }
      throw Xe(i)
        ? ((a.rendered = !0),
          (i.options._fromLocation = a.location),
          (i.redirectHandled = !0),
          (i = a.router.resolveRedirect(i)),
          i)
        : (dv(a, i), i)
    }
  },
  hv = (a, o) => {
    const i = a.router.getMatch(o)
    return !!(
      (!a.router.isServer && i._nonReactive.dehydrated) ||
      (a.router.isServer && i.ssr === !1)
    )
  },
  Oi = (a, o, i, s) => {
    const { id: c, routeId: f } = a.matches[o],
      m = a.router.looseRoutesById[f]
    if (i instanceof Promise) throw i
    ;((i.routerCode = s),
      (a.firstBadMatchIndex ??= o),
      $n(a, a.router.getMatch(c), i))
    try {
      m.options.onError?.(i)
    } catch (h) {
      ;((i = h), $n(a, a.router.getMatch(c), i))
    }
    a.updateMatch(
      c,
      (h) => (
        h._nonReactive.beforeLoadPromise?.resolve(),
        (h._nonReactive.beforeLoadPromise = void 0),
        h._nonReactive.loadPromise?.resolve(),
        {
          ...h,
          error: i,
          status: 'error',
          isFetching: !1,
          updatedAt: Date.now(),
          abortController: new AbortController(),
        }
      ),
    )
  },
  wb = (a, o, i, s) => {
    const c = a.router.getMatch(o),
      f = a.matches[i - 1]?.id,
      m = f ? a.router.getMatch(f) : void 0
    if (a.router.isShell()) {
      c.ssr = s.id === Ce
      return
    }
    if (m?.ssr === !1) {
      c.ssr = !1
      return
    }
    const h = (T) => (T === !0 && m?.ssr === 'data-only' ? 'data-only' : T),
      p = a.router.options.defaultSsr ?? !0
    if (s.options.ssr === void 0) {
      c.ssr = h(p)
      return
    }
    if (typeof s.options.ssr != 'function') {
      c.ssr = h(s.options.ssr)
      return
    }
    const { search: v, params: b } = c,
      g = {
        search: vr(v, c.searchError),
        params: vr(b, c.paramsError),
        location: a.location,
        matches: a.matches.map((T) => ({
          index: T.index,
          pathname: T.pathname,
          fullPath: T.fullPath,
          staticData: T.staticData,
          id: T.id,
          routeId: T.routeId,
          search: vr(T.search, T.searchError),
          params: vr(T.params, T.paramsError),
          ssr: T.ssr,
        })),
      },
      S = s.options.ssr(g)
    if (ta(S))
      return S.then((T) => {
        c.ssr = h(T ?? p)
      })
    c.ssr = h(S ?? p)
  },
  mv = (a, o, i, s) => {
    if (s._nonReactive.pendingTimeout !== void 0) return
    const c = i.options.pendingMs ?? a.router.options.defaultPendingMs
    if (
      !!(
        a.onReady &&
        !a.router.isServer &&
        !Xr(a, o) &&
        (i.options.loader || i.options.beforeLoad || gv(i)) &&
        typeof c == 'number' &&
        c !== 1 / 0 &&
        (i.options.pendingComponent ??
          a.router.options?.defaultPendingComponent)
      )
    ) {
      const m = setTimeout(() => {
        Mr(a)
      }, c)
      s._nonReactive.pendingTimeout = m
    }
  },
  zb = (a, o, i) => {
    const s = a.router.getMatch(o)
    if (!s._nonReactive.beforeLoadPromise && !s._nonReactive.loaderPromise)
      return
    mv(a, o, i, s)
    const c = () => {
      const f = a.router.getMatch(o)
      f.preload &&
        (f.status === 'redirected' || f.status === 'notFound') &&
        $n(a, f, f.error)
    }
    return s._nonReactive.beforeLoadPromise
      ? s._nonReactive.beforeLoadPromise.then(c)
      : c()
  },
  Db = (a, o, i, s) => {
    const c = a.router.getMatch(o),
      f = c._nonReactive.loadPromise
    c._nonReactive.loadPromise = Cl(() => {
      f?.resolve()
    })
    const { paramsError: m, searchError: h } = c
    ;(m && Oi(a, i, m, 'PARSE_PARAMS'),
      h && Oi(a, i, h, 'VALIDATE_SEARCH'),
      mv(a, o, s, c))
    const p = new AbortController(),
      v = a.matches[i - 1]?.id
    ;(v ? a.router.getMatch(v) : void 0)?.context ?? a.router.options.context
    let g = !1
    const S = () => {
        g ||
          ((g = !0),
          a.updateMatch(o, (G) => ({
            ...G,
            isFetching: 'beforeLoad',
            fetchCount: G.fetchCount + 1,
            abortController: p,
          })))
      },
      T = () => {
        ;(c._nonReactive.beforeLoadPromise?.resolve(),
          (c._nonReactive.beforeLoadPromise = void 0),
          a.updateMatch(o, (G) => ({ ...G, isFetching: !1 })))
      }
    if (!s.options.beforeLoad) {
      Bi(() => {
        ;(S(), T())
      })
      return
    }
    c._nonReactive.beforeLoadPromise = Cl()
    const N = { ...$c(a, i, !1), ...c.__routeContext },
      { search: M, params: O, cause: U } = c,
      Q = Xr(a, o),
      K = {
        search: M,
        abortController: p,
        params: O,
        preload: Q,
        context: N,
        location: a.location,
        navigate: (G) => a.router.navigate({ ...G, _fromLocation: a.location }),
        buildLocation: a.router.buildLocation,
        cause: Q ? 'preload' : U,
        matches: a.matches,
        ...a.router.options.additionalContext,
      },
      X = (G) => {
        if (G === void 0) {
          Bi(() => {
            ;(S(), T())
          })
          return
        }
        ;((Xe(G) || qe(G)) && (S(), Oi(a, i, G, 'BEFORE_LOAD')),
          Bi(() => {
            ;(S(),
              a.updateMatch(o, (Y) => ({ ...Y, __beforeLoadContext: G })),
              T())
          }))
      }
    let W
    try {
      if (((W = s.options.beforeLoad(K)), ta(W)))
        return (
          S(),
          W.catch((G) => {
            Oi(a, i, G, 'BEFORE_LOAD')
          }).then(X)
        )
    } catch (G) {
      ;(S(), Oi(a, i, G, 'BEFORE_LOAD'))
    }
    X(W)
  },
  Nb = (a, o) => {
    const { id: i, routeId: s } = a.matches[o],
      c = a.router.looseRoutesById[s],
      f = () => {
        if (a.router.isServer) {
          const p = wb(a, i, o, c)
          if (ta(p)) return p.then(h)
        }
        return h()
      },
      m = () => Db(a, i, o, c),
      h = () => {
        if (hv(a, i)) return
        const p = zb(a, i, c)
        return ta(p) ? p.then(m) : m()
      }
    return f()
  },
  Hi = (a, o, i) => {
    const s = a.router.getMatch(o)
    if (!s || (!i.options.head && !i.options.scripts && !i.options.headers))
      return
    const c = {
      matches: a.matches,
      match: s,
      params: s.params,
      loaderData: s.loaderData,
    }
    return Promise.all([
      i.options.head?.(c),
      i.options.scripts?.(c),
      i.options.headers?.(c),
    ]).then(([f, m, h]) => {
      const p = f?.meta,
        v = f?.links,
        b = f?.scripts,
        g = f?.styles
      return {
        meta: p,
        links: v,
        headScripts: b,
        headers: h,
        scripts: m,
        styles: g,
      }
    })
  },
  pv = (a, o, i, s) => {
    const c = a.matchPromises[i - 1],
      {
        params: f,
        loaderDeps: m,
        abortController: h,
        cause: p,
      } = a.router.getMatch(o),
      v = $c(a, i),
      b = Xr(a, o)
    return {
      params: f,
      deps: m,
      preload: !!b,
      parentMatchPromise: c,
      abortController: h,
      context: v,
      location: a.location,
      navigate: (g) => a.router.navigate({ ...g, _fromLocation: a.location }),
      cause: b ? 'preload' : p,
      route: s,
      ...a.router.options.additionalContext,
    }
  },
  Sp = async (a, o, i, s) => {
    try {
      const c = a.router.getMatch(o)
      try {
        ;(!a.router.isServer || c.ssr === !0) && vv(s)
        const f = s.options.loader?.(pv(a, o, i, s)),
          m = s.options.loader && ta(f)
        if (
          (!!(
            m ||
            s._lazyPromise ||
            s._componentsPromise ||
            s.options.head ||
            s.options.scripts ||
            s.options.headers ||
            c._nonReactive.minPendingPromise
          ) && a.updateMatch(o, (g) => ({ ...g, isFetching: 'loader' })),
          s.options.loader)
        ) {
          const g = m ? await f : f
          ;($n(a, a.router.getMatch(o), g),
            g !== void 0 && a.updateMatch(o, (S) => ({ ...S, loaderData: g })))
        }
        s._lazyPromise && (await s._lazyPromise)
        const p = Hi(a, o, s),
          v = p ? await p : void 0,
          b = c._nonReactive.minPendingPromise
        ;(b && (await b),
          s._componentsPromise && (await s._componentsPromise),
          a.updateMatch(o, (g) => ({
            ...g,
            error: void 0,
            status: 'success',
            isFetching: !1,
            updatedAt: Date.now(),
            ...v,
          })))
      } catch (f) {
        let m = f
        const h = c._nonReactive.minPendingPromise
        ;(h && (await h),
          qe(f) && (await s.options.notFoundComponent?.preload?.()),
          $n(a, a.router.getMatch(o), f))
        try {
          s.options.onError?.(f)
        } catch (b) {
          ;((m = b), $n(a, a.router.getMatch(o), b))
        }
        const p = Hi(a, o, s),
          v = p ? await p : void 0
        a.updateMatch(o, (b) => ({
          ...b,
          error: m,
          status: 'error',
          isFetching: !1,
          ...v,
        }))
      }
    } catch (c) {
      const f = a.router.getMatch(o)
      if (f) {
        const m = Hi(a, o, s)
        if (m) {
          const h = await m
          a.updateMatch(o, (p) => ({ ...p, ...h }))
        }
        f._nonReactive.loaderPromise = void 0
      }
      $n(a, f, c)
    }
  },
  Lb = async (a, o) => {
    const { id: i, routeId: s } = a.matches[o]
    let c = !1,
      f = !1
    const m = a.router.looseRoutesById[s],
      h = () => {
        a.updateMatch(i, (b) => ({ ...b, context: $c(a, o) }))
      }
    if (hv(a, i)) {
      if (a.router.isServer) {
        const b = Hi(a, i, m)
        if (b) {
          const g = await b
          a.updateMatch(i, (S) => ({ ...S, ...g }))
        }
        return a.router.getMatch(i)
      }
    } else {
      const b = a.router.getMatch(i)
      if (b._nonReactive.loaderPromise) {
        if (b.status === 'success' && !a.sync && !b.preload) return b
        await b._nonReactive.loaderPromise
        const g = a.router.getMatch(i),
          S = g._nonReactive.error || g.error
        S && $n(a, g, S)
      } else {
        const g = Date.now() - b.updatedAt,
          S = Xr(a, i),
          T = S
            ? (m.options.preloadStaleTime ??
              a.router.options.defaultPreloadStaleTime ??
              3e4)
            : (m.options.staleTime ?? a.router.options.defaultStaleTime ?? 0),
          N = m.options.shouldReload,
          M = typeof N == 'function' ? N(pv(a, i, o, m)) : N,
          O = !!S && !a.router.state.matches.some((X) => X.id === i),
          U = a.router.getMatch(i)
        ;((U._nonReactive.loaderPromise = Cl()),
          O !== U.preload && a.updateMatch(i, (X) => ({ ...X, preload: O })))
        const { status: Q, invalid: K } = U
        if (
          ((c = Q === 'success' && (K || (M ?? g > T))),
          !(S && m.options.preload === !1))
        )
          if (c && !a.sync)
            ((f = !0),
              (async () => {
                try {
                  ;(await Sp(a, i, o, m), h())
                  const X = a.router.getMatch(i)
                  ;(X._nonReactive.loaderPromise?.resolve(),
                    X._nonReactive.loadPromise?.resolve(),
                    (X._nonReactive.loaderPromise = void 0))
                } catch (X) {
                  Xe(X) && (await a.router.navigate(X.options))
                }
              })())
          else if (Q !== 'success' || (c && a.sync)) await Sp(a, i, o, m)
          else {
            const X = Hi(a, i, m)
            if (X) {
              const W = await X
              a.updateMatch(i, (G) => ({ ...G, ...W }))
            }
          }
      }
    }
    const p = a.router.getMatch(i)
    ;(f ||
      (p._nonReactive.loaderPromise?.resolve(),
      p._nonReactive.loadPromise?.resolve()),
      clearTimeout(p._nonReactive.pendingTimeout),
      (p._nonReactive.pendingTimeout = void 0),
      f || (p._nonReactive.loaderPromise = void 0),
      (p._nonReactive.dehydrated = void 0),
      f || h())
    const v = f ? p.isFetching : !1
    return v !== p.isFetching || p.invalid !== !1
      ? (a.updateMatch(i, (b) => ({ ...b, isFetching: v, invalid: !1 })),
        a.router.getMatch(i))
      : p
  }
async function xp(a) {
  const o = Object.assign(a, { matchPromises: [] })
  !o.router.isServer &&
    o.router.state.matches.some((i) => i._forcePending) &&
    Mr(o)
  try {
    for (let c = 0; c < o.matches.length; c++) {
      const f = Nb(o, c)
      ta(f) && (await f)
    }
    const i = o.firstBadMatchIndex ?? o.matches.length
    for (let c = 0; c < i; c++) o.matchPromises.push(Lb(o, c))
    await Promise.all(o.matchPromises)
    const s = Mr(o)
    ta(s) && (await s)
  } catch (i) {
    if (qe(i) && !o.preload) {
      const s = Mr(o)
      throw (ta(s) && (await s), i)
    }
    if (Xe(i)) throw i
  }
  return o.matches
}
async function vv(a) {
  if (
    (!a._lazyLoaded &&
      a._lazyPromise === void 0 &&
      (a.lazyFn
        ? (a._lazyPromise = a.lazyFn().then((o) => {
            const { id: i, ...s } = o.options
            ;(Object.assign(a.options, s),
              (a._lazyLoaded = !0),
              (a._lazyPromise = void 0))
          }))
        : (a._lazyLoaded = !0)),
    !a._componentsLoaded && a._componentsPromise === void 0)
  ) {
    const o = () => {
      const i = []
      for (const s of yv) {
        const c = a.options[s]?.preload
        c && i.push(c())
      }
      if (i.length)
        return Promise.all(i).then(() => {
          ;((a._componentsLoaded = !0), (a._componentsPromise = void 0))
        })
      ;((a._componentsLoaded = !0), (a._componentsPromise = void 0))
    }
    a._componentsPromise = a._lazyPromise ? a._lazyPromise.then(o) : o()
  }
  return a._componentsPromise
}
function vr(a, o) {
  return o ? { status: 'error', error: o } : { status: 'success', value: a }
}
function gv(a) {
  for (const o of yv) if (a.options[o]?.preload) return !0
  return !1
}
const yv = [
  'component',
  'errorComponent',
  'pendingComponent',
  'notFoundComponent',
]
function jb(a) {
  return {
    input: ({ url: o }) => {
      for (const i of a) o = bv(i, o)
      return o
    },
    output: ({ url: o }) => {
      for (let i = a.length - 1; i >= 0; i--) o = Sv(a[i], o)
      return o
    },
  }
}
function Ub(a) {
  const o = uv(a.basepath),
    i = `/${o}`,
    s = `${i}/`,
    c = a.caseSensitive ? i : i.toLowerCase(),
    f = a.caseSensitive ? s : s.toLowerCase()
  return {
    input: ({ url: m }) => {
      const h = a.caseSensitive ? m.pathname : m.pathname.toLowerCase()
      return (
        h === c
          ? (m.pathname = '/')
          : h.startsWith(f) && (m.pathname = m.pathname.slice(i.length)),
        m
      )
    },
    output: ({ url: m }) => ((m.pathname = Ar(['/', o, m.pathname])), m),
  }
}
function bv(a, o) {
  const i = a?.input?.({ url: o })
  if (i) {
    if (typeof i == 'string') return new URL(i)
    if (i instanceof URL) return i
  }
  return o
}
function Sv(a, o) {
  const i = a?.output?.({ url: o })
  if (i) {
    if (typeof i == 'string') return new URL(i)
    if (i instanceof URL) return i
  }
  return o
}
function Ra(a) {
  const o = a.resolvedLocation,
    i = a.location,
    s = o?.pathname !== i.pathname,
    c = o?.href !== i.href,
    f = o?.hash !== i.hash
  return {
    fromLocation: o,
    toLocation: i,
    pathChanged: s,
    hrefChanged: c,
    hashChanged: f,
  }
}
class Bb {
  constructor(o) {
    ;((this.tempLocationKey = `${Math.round(Math.random() * 1e7)}`),
      (this.resetNextScroll = !0),
      (this.shouldViewTransition = void 0),
      (this.isViewTransitionTypesSupported = void 0),
      (this.subscribers = new Set()),
      (this.isScrollRestoring = !1),
      (this.isScrollRestorationSetup = !1),
      (this.startTransition = (i) => i()),
      (this.update = (i) => {
        i.notFoundRoute &&
          console.warn(
            'The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info.',
          )
        const s = this.options,
          c = this.basepath ?? s?.basepath ?? '/',
          f = this.basepath === void 0,
          m = s?.rewrite
        ;((this.options = { ...s, ...i }),
          (this.isServer = this.options.isServer ?? typeof document > 'u'),
          (this.pathParamsDecodeCharMap = this.options
            .pathParamsAllowedCharacters
            ? new Map(
                this.options.pathParamsAllowedCharacters.map((S) => [
                  encodeURIComponent(S),
                  S,
                ]),
              )
            : void 0),
          (!this.history ||
            (this.options.history && this.options.history !== this.history)) &&
            (this.options.history
              ? (this.history = this.options.history)
              : this.isServer || (this.history = $0())),
          (this.origin = this.options.origin),
          this.origin ||
            (!this.isServer && window?.origin && window.origin !== 'null'
              ? (this.origin = window.origin)
              : (this.origin = 'http://localhost')),
          this.history && this.updateLatestLocation(),
          this.options.routeTree !== this.routeTree &&
            ((this.routeTree = this.options.routeTree), this.buildRouteTree()),
          !this.__store &&
            this.latestLocation &&
            ((this.__store = new F0(kb(this.latestLocation), {
              onUpdate: () => {
                this.__store.state = {
                  ...this.state,
                  cachedMatches: this.state.cachedMatches.filter(
                    (S) => !['redirected'].includes(S.status),
                  ),
                }
              },
            })),
            Eb(this)))
        let h = !1
        const p = this.options.basepath ?? '/',
          v = this.options.rewrite
        if (f || c !== p || m !== v) {
          this.basepath = p
          const S = []
          ;(uv(p) !== '' && S.push(Ub({ basepath: p })),
            v && S.push(v),
            (this.rewrite =
              S.length === 0 ? void 0 : S.length === 1 ? S[0] : jb(S)),
            this.history && this.updateLatestLocation(),
            (h = !0))
        }
        ;(h &&
          this.__store &&
          (this.__store.state = {
            ...this.state,
            location: this.latestLocation,
          }),
          typeof window < 'u' &&
            'CSS' in window &&
            typeof window.CSS?.supports == 'function' &&
            (this.isViewTransitionTypesSupported = window.CSS.supports(
              'selector(:active-view-transition-type(a)',
            )))
      }),
      (this.updateLatestLocation = () => {
        this.latestLocation = this.parseLocation(
          this.history.location,
          this.latestLocation,
        )
      }),
      (this.buildRouteTree = () => {
        const {
          routesById: i,
          routesByPath: s,
          processedTree: c,
        } = cb(this.routeTree, this.options.caseSensitive, (m, h) => {
          m.init({ originalIndex: h })
        })
        ;(this.options.routeMasks && ib(this.options.routeMasks, c),
          (this.routesById = i),
          (this.routesByPath = s),
          (this.processedTree = c))
        const f = this.options.notFoundRoute
        f &&
          (f.init({ originalIndex: 99999999999 }), (this.routesById[f.id] = f))
      }),
      (this.subscribe = (i, s) => {
        const c = { eventType: i, fn: s }
        return (
          this.subscribers.add(c),
          () => {
            this.subscribers.delete(c)
          }
        )
      }),
      (this.emit = (i) => {
        this.subscribers.forEach((s) => {
          s.eventType === i.type && s.fn(i)
        })
      }),
      (this.parseLocation = (i, s) => {
        const c = ({ href: p, state: v }) => {
            const b = new URL(p, this.origin),
              g = bv(this.rewrite, b),
              S = this.options.parseSearch(g.search),
              T = this.options.stringifySearch(S)
            return (
              (g.search = T),
              {
                href: g.href.replace(g.origin, ''),
                publicHref: p,
                url: g,
                pathname: bp(g.pathname),
                searchStr: T,
                search: ke(s?.search, S),
                hash: g.hash.split('#').reverse()[0] ?? '',
                state: ke(s?.state, v),
              }
            )
          },
          f = c(i),
          { __tempLocation: m, __tempKey: h } = f.state
        if (m && (!h || h === this.tempLocationKey)) {
          const p = c(m)
          return (
            (p.state.key = f.state.key),
            (p.state.__TSR_key = f.state.__TSR_key),
            delete p.state.__tempLocation,
            { ...p, maskedLocation: f }
          )
        }
        return f
      }),
      (this.resolvePathCache = jr(1e3)),
      (this.resolvePathWithBase = (i, s) =>
        vb({
          base: i,
          to: Wc(s),
          trailingSlash: this.options.trailingSlash,
          cache: this.resolvePathCache,
        })),
      (this.matchRoutes = (i, s, c) =>
        typeof i == 'string'
          ? this.matchRoutesInternal({ pathname: i, search: s }, c)
          : this.matchRoutesInternal(i, s)),
      (this.getMatchedRoutes = (i) =>
        qb({
          pathname: i,
          routesById: this.routesById,
          processedTree: this.processedTree,
        })),
      (this.cancelMatch = (i) => {
        const s = this.getMatch(i)
        s &&
          (s.abortController.abort(),
          clearTimeout(s._nonReactive.pendingTimeout),
          (s._nonReactive.pendingTimeout = void 0))
      }),
      (this.cancelMatches = () => {
        const i = this.state.matches.filter((f) => f.status === 'pending'),
          s = this.state.matches.filter((f) => f.isFetching === 'loader')
        new Set([...(this.state.pendingMatches ?? []), ...i, ...s]).forEach(
          (f) => {
            this.cancelMatch(f.id)
          },
        )
      }),
      (this.buildLocation = (i) => {
        const s = (f = {}) => {
            const m =
                f._fromLocation ||
                this.pendingBuiltLocation ||
                this.latestLocation,
              h = this.matchRoutes(m, { _buildLocation: !0 }),
              p = Nr(h)
            f.from
            const v =
                f.unsafeRelative === 'path'
                  ? m.pathname
                  : (f.from ?? p.fullPath),
              b = this.resolvePathWithBase(v, '.'),
              g = p.search,
              S = { ...p.params },
              T = f.to
                ? this.resolvePathWithBase(b, `${f.to}`)
                : this.resolvePathWithBase(b, '.'),
              N =
                f.params === !1 || f.params === null
                  ? {}
                  : (f.params ?? !0) === !0
                    ? S
                    : Object.assign(S, Wn(f.params, S)),
              M = pc({ path: T, params: N }).interpolatedPath,
              O = this.matchRoutes(M, void 0, { _buildLocation: !0 }).map(
                (ut) => this.looseRoutesById[ut.routeId],
              )
            if (Object.keys(N).length > 0)
              for (const ut of O) {
                const st =
                  ut.options.params?.stringify ?? ut.options.stringifyParams
                st && Object.assign(N, st(N))
              }
            const U = i.leaveParams
              ? T
              : bp(
                  pc({
                    path: T,
                    params: N,
                    decodeCharMap: this.pathParamsDecodeCharMap,
                  }).interpolatedPath,
                )
            let Q = g
            if (i._includeValidateSearch && this.options.search?.strict) {
              const ut = {}
              ;(O.forEach((st) => {
                if (st.options.validateSearch)
                  try {
                    Object.assign(
                      ut,
                      Vc(st.options.validateSearch, { ...ut, ...Q }),
                    )
                  } catch {}
              }),
                (Q = ut))
            }
            ;((Q = Yb({
              search: Q,
              dest: f,
              destRoutes: O,
              _includeValidateSearch: i._includeValidateSearch,
            })),
              (Q = ke(g, Q)))
            const K = this.options.stringifySearch(Q),
              X = f.hash === !0 ? m.hash : f.hash ? Wn(f.hash, m.hash) : void 0,
              W = X ? `#${X}` : ''
            let G =
              f.state === !0 ? m.state : f.state ? Wn(f.state, m.state) : {}
            G = ke(m.state, G)
            const Y = `${U}${K}${W}`,
              B = new URL(Y, this.origin),
              $ = Sv(this.rewrite, B)
            return {
              publicHref: $.pathname + $.search + $.hash,
              href: Y,
              url: $,
              pathname: U,
              search: Q,
              searchStr: K,
              state: G,
              hash: X ?? '',
              unmaskOnReload: f.unmaskOnReload,
            }
          },
          c = (f = {}, m) => {
            const h = s(f)
            let p = m ? s(m) : void 0
            if (!p) {
              const v = {}
              if (this.options.routeMasks) {
                const b = ob(h.pathname, this.processedTree)
                if (b) {
                  Object.assign(v, b.params)
                  const { from: g, params: S, ...T } = b.route,
                    N =
                      S === !1 || S === null
                        ? {}
                        : (S ?? !0) === !0
                          ? v
                          : Object.assign(v, Wn(S, v))
                  ;((m = { from: i.from, ...T, params: N }), (p = s(m)))
                }
              }
            }
            return (p && (h.maskedLocation = p), h)
          }
        return i.mask ? c(i, { from: i.from, ...i.mask }) : c(i)
      }),
      (this.commitLocation = ({
        viewTransition: i,
        ignoreBlocker: s,
        ...c
      }) => {
        const f = () => {
            const p = [
              'key',
              '__TSR_key',
              '__TSR_index',
              '__hashScrollIntoViewOptions',
            ]
            p.forEach((b) => {
              c.state[b] = this.latestLocation.state[b]
            })
            const v = Ea(c.state, this.latestLocation.state)
            return (
              p.forEach((b) => {
                delete c.state[b]
              }),
              v
            )
          },
          m = _a(this.latestLocation.href) === _a(c.href),
          h = this.commitLocationPromise
        if (
          ((this.commitLocationPromise = Cl(() => {
            h?.resolve()
          })),
          m && f())
        )
          this.load()
        else {
          let { maskedLocation: p, hashScrollIntoView: v, url: b, ...g } = c
          ;(p &&
            ((g = {
              ...p,
              state: {
                ...p.state,
                __tempKey: void 0,
                __tempLocation: {
                  ...g,
                  search: g.searchStr,
                  state: {
                    ...g.state,
                    __tempKey: void 0,
                    __tempLocation: void 0,
                    __TSR_key: void 0,
                    key: void 0,
                  },
                },
              },
            }),
            (g.unmaskOnReload ?? this.options.unmaskOnReload ?? !1) &&
              (g.state.__tempKey = this.tempLocationKey)),
            (g.state.__hashScrollIntoViewOptions =
              v ?? this.options.defaultHashScrollIntoView ?? !0),
            (this.shouldViewTransition = i),
            this.history[c.replace ? 'replace' : 'push'](
              g.publicHref,
              g.state,
              { ignoreBlocker: s },
            ))
        }
        return (
          (this.resetNextScroll = c.resetScroll ?? !0),
          this.history.subscribers.size || this.load(),
          this.commitLocationPromise
        )
      }),
      (this.buildAndCommitLocation = ({
        replace: i,
        resetScroll: s,
        hashScrollIntoView: c,
        viewTransition: f,
        ignoreBlocker: m,
        href: h,
        ...p
      } = {}) => {
        if (h) {
          const g = this.history.location.state.__TSR_index,
            S = Dr(h, { __TSR_index: i ? g : g + 1 })
          ;((p.to = S.pathname),
            (p.search = this.options.parseSearch(S.search)),
            (p.hash = S.hash.slice(1)))
        }
        const v = this.buildLocation({ ...p, _includeValidateSearch: !0 })
        this.pendingBuiltLocation = v
        const b = this.commitLocation({
          ...v,
          viewTransition: f,
          replace: i,
          resetScroll: s,
          hashScrollIntoView: c,
          ignoreBlocker: m,
        })
        return (
          Promise.resolve().then(() => {
            this.pendingBuiltLocation === v &&
              (this.pendingBuiltLocation = void 0)
          }),
          b
        )
      }),
      (this.navigate = async ({ to: i, reloadDocument: s, href: c, ...f }) => {
        if (!s && c)
          try {
            ;(new URL(`${c}`), (s = !0))
          } catch {}
        if (s) {
          if (
            (c || (c = this.buildLocation({ to: i, ...f }).url.href),
            !f.ignoreBlocker)
          ) {
            const h = this.history.getBlockers?.() ?? []
            for (const p of h)
              if (
                p?.blockerFn &&
                (await p.blockerFn({
                  currentLocation: this.latestLocation,
                  nextLocation: this.latestLocation,
                  action: 'PUSH',
                }))
              )
                return Promise.resolve()
          }
          return (
            f.replace ? window.location.replace(c) : (window.location.href = c),
            Promise.resolve()
          )
        }
        return this.buildAndCommitLocation({
          ...f,
          href: c,
          to: i,
          _isNavigate: !0,
        })
      }),
      (this.beforeLoad = () => {
        if (
          (this.cancelMatches(), this.updateLatestLocation(), this.isServer)
        ) {
          const s = this.buildLocation({
            to: this.latestLocation.pathname,
            search: !0,
            params: !0,
            hash: !0,
            state: !0,
            _includeValidateSearch: !0,
          })
          if (
            this.latestLocation.publicHref !== s.publicHref ||
            s.url.origin !== this.origin
          ) {
            const c = this.getParsedLocationHref(s)
            throw fv({ href: c })
          }
        }
        const i = this.matchRoutes(this.latestLocation)
        this.__store.setState((s) => ({
          ...s,
          status: 'pending',
          statusCode: 200,
          isLoading: !0,
          location: this.latestLocation,
          pendingMatches: i,
          cachedMatches: s.cachedMatches.filter(
            (c) => !i.some((f) => f.id === c.id),
          ),
        }))
      }),
      (this.load = async (i) => {
        let s, c, f
        for (
          f = new Promise((h) => {
            this.startTransition(async () => {
              try {
                this.beforeLoad()
                const p = this.latestLocation,
                  v = this.state.resolvedLocation
                ;(this.state.redirect ||
                  this.emit({
                    type: 'onBeforeNavigate',
                    ...Ra({ resolvedLocation: v, location: p }),
                  }),
                  this.emit({
                    type: 'onBeforeLoad',
                    ...Ra({ resolvedLocation: v, location: p }),
                  }),
                  await xp({
                    router: this,
                    sync: i?.sync,
                    matches: this.state.pendingMatches,
                    location: p,
                    updateMatch: this.updateMatch,
                    onReady: async () => {
                      this.startTransition(() => {
                        this.startViewTransition(async () => {
                          let b = [],
                            g = [],
                            S = []
                          ;(Bi(() => {
                            ;(this.__store.setState((T) => {
                              const N = T.matches,
                                M = T.pendingMatches || T.matches
                              return (
                                (b = N.filter(
                                  (O) => !M.some((U) => U.id === O.id),
                                )),
                                (g = M.filter(
                                  (O) => !N.some((U) => U.id === O.id),
                                )),
                                (S = M.filter((O) =>
                                  N.some((U) => U.id === O.id),
                                )),
                                {
                                  ...T,
                                  isLoading: !1,
                                  loadedAt: Date.now(),
                                  matches: M,
                                  pendingMatches: void 0,
                                  cachedMatches: [
                                    ...T.cachedMatches,
                                    ...b.filter(
                                      (O) =>
                                        O.status !== 'error' &&
                                        O.status !== 'notFound',
                                    ),
                                  ],
                                }
                              )
                            }),
                              this.clearExpiredCache())
                          }),
                            [
                              [b, 'onLeave'],
                              [g, 'onEnter'],
                              [S, 'onStay'],
                            ].forEach(([T, N]) => {
                              T.forEach((M) => {
                                this.looseRoutesById[M.routeId].options[N]?.(M)
                              })
                            }))
                        })
                      })
                    },
                  }))
              } catch (p) {
                ;(Xe(p)
                  ? ((s = p),
                    this.isServer ||
                      this.navigate({
                        ...s.options,
                        replace: !0,
                        ignoreBlocker: !0,
                      }))
                  : qe(p) && (c = p),
                  this.__store.setState((v) => ({
                    ...v,
                    statusCode: s
                      ? s.status
                      : c
                        ? 404
                        : v.matches.some((b) => b.status === 'error')
                          ? 500
                          : 200,
                    redirect: s,
                  })))
              }
              ;(this.latestLoadPromise === f &&
                (this.commitLocationPromise?.resolve(),
                (this.latestLoadPromise = void 0),
                (this.commitLocationPromise = void 0)),
                h())
            })
          }),
            this.latestLoadPromise = f,
            await f;
          this.latestLoadPromise && f !== this.latestLoadPromise;
        )
          await this.latestLoadPromise
        let m
        ;(this.hasNotFoundMatch()
          ? (m = 404)
          : this.__store.state.matches.some((h) => h.status === 'error') &&
            (m = 500),
          m !== void 0 &&
            this.__store.setState((h) => ({ ...h, statusCode: m })))
      }),
      (this.startViewTransition = (i) => {
        const s =
          this.shouldViewTransition ?? this.options.defaultViewTransition
        if (
          (delete this.shouldViewTransition,
          s &&
            typeof document < 'u' &&
            'startViewTransition' in document &&
            typeof document.startViewTransition == 'function')
        ) {
          let c
          if (typeof s == 'object' && this.isViewTransitionTypesSupported) {
            const f = this.latestLocation,
              m = this.state.resolvedLocation,
              h =
                typeof s.types == 'function'
                  ? s.types(Ra({ resolvedLocation: m, location: f }))
                  : s.types
            if (h === !1) {
              i()
              return
            }
            c = { update: i, types: h }
          } else c = i
          document.startViewTransition(c)
        } else i()
      }),
      (this.updateMatch = (i, s) => {
        this.startTransition(() => {
          const c = this.state.pendingMatches?.some((f) => f.id === i)
            ? 'pendingMatches'
            : this.state.matches.some((f) => f.id === i)
              ? 'matches'
              : this.state.cachedMatches.some((f) => f.id === i)
                ? 'cachedMatches'
                : ''
          c &&
            this.__store.setState((f) => ({
              ...f,
              [c]: f[c]?.map((m) => (m.id === i ? s(m) : m)),
            }))
        })
      }),
      (this.getMatch = (i) => {
        const s = (c) => c.id === i
        return (
          this.state.cachedMatches.find(s) ??
          this.state.pendingMatches?.find(s) ??
          this.state.matches.find(s)
        )
      }),
      (this.invalidate = (i) => {
        const s = (c) =>
          (i?.filter?.(c) ?? !0)
            ? {
                ...c,
                invalid: !0,
                ...(i?.forcePending ||
                c.status === 'error' ||
                c.status === 'notFound'
                  ? { status: 'pending', error: void 0 }
                  : void 0),
              }
            : c
        return (
          this.__store.setState((c) => ({
            ...c,
            matches: c.matches.map(s),
            cachedMatches: c.cachedMatches.map(s),
            pendingMatches: c.pendingMatches?.map(s),
          })),
          (this.shouldViewTransition = !1),
          this.load({ sync: i?.sync })
        )
      }),
      (this.getParsedLocationHref = (i) => {
        let s = i.url.href
        return (
          this.origin &&
            i.url.origin === this.origin &&
            (s = s.replace(this.origin, '') || '/'),
          s
        )
      }),
      (this.resolveRedirect = (i) => {
        if (!i.options.href) {
          const s = this.buildLocation(i.options),
            c = this.getParsedLocationHref(s)
          ;((i.options.href = s.href), i.headers.set('Location', c))
        }
        return (
          i.headers.get('Location') ||
            i.headers.set('Location', i.options.href),
          i
        )
      }),
      (this.clearCache = (i) => {
        const s = i?.filter
        s !== void 0
          ? this.__store.setState((c) => ({
              ...c,
              cachedMatches: c.cachedMatches.filter((f) => !s(f)),
            }))
          : this.__store.setState((c) => ({ ...c, cachedMatches: [] }))
      }),
      (this.clearExpiredCache = () => {
        const i = (s) => {
          const c = this.looseRoutesById[s.routeId]
          if (!c.options.loader) return !0
          const f =
            (s.preload
              ? (c.options.preloadGcTime ?? this.options.defaultPreloadGcTime)
              : (c.options.gcTime ?? this.options.defaultGcTime)) ?? 300 * 1e3
          return s.status === 'error' ? !0 : Date.now() - s.updatedAt >= f
        }
        this.clearCache({ filter: i })
      }),
      (this.loadRouteChunk = vv),
      (this.preloadRoute = async (i) => {
        const s = this.buildLocation(i)
        let c = this.matchRoutes(s, { throwOnError: !0, preload: !0, dest: i })
        const f = new Set(
            [...this.state.matches, ...(this.state.pendingMatches ?? [])].map(
              (h) => h.id,
            ),
          ),
          m = new Set([...f, ...this.state.cachedMatches.map((h) => h.id)])
        Bi(() => {
          c.forEach((h) => {
            m.has(h.id) ||
              this.__store.setState((p) => ({
                ...p,
                cachedMatches: [...p.cachedMatches, h],
              }))
          })
        })
        try {
          return (
            (c = await xp({
              router: this,
              matches: c,
              location: s,
              preload: !0,
              updateMatch: (h, p) => {
                f.has(h)
                  ? (c = c.map((v) => (v.id === h ? p(v) : v)))
                  : this.updateMatch(h, p)
              },
            })),
            c
          )
        } catch (h) {
          if (Xe(h))
            return h.options.reloadDocument
              ? void 0
              : await this.preloadRoute({ ...h.options, _fromLocation: s })
          qe(h) || console.error(h)
          return
        }
      }),
      (this.matchRoute = (i, s) => {
        const c = {
            ...i,
            to: i.to ? this.resolvePathWithBase(i.from || '', i.to) : void 0,
            params: i.params || {},
            leaveParams: !0,
          },
          f = this.buildLocation(c)
        if (s?.pending && this.state.status !== 'pending') return !1
        const h = (s?.pending === void 0 ? !this.state.isLoading : s.pending)
            ? this.latestLocation
            : this.state.resolvedLocation || this.state.location,
          p = rb(
            f.pathname,
            s?.caseSensitive ?? !1,
            s?.fuzzy ?? !1,
            h.pathname,
            this.processedTree,
          )
        return !p || (i.params && !Ea(p.params, i.params, { partial: !0 }))
          ? !1
          : (s?.includeSearch ?? !0)
            ? Ea(h.search, f.search, { partial: !0 })
              ? p.params
              : !1
            : p.params
      }),
      (this.hasNotFoundMatch = () =>
        this.__store.state.matches.some(
          (i) => i.status === 'notFound' || i.globalNotFound,
        )),
      this.update({
        defaultPreloadDelay: 50,
        defaultPendingMs: 1e3,
        defaultPendingMinMs: 500,
        context: void 0,
        ...o,
        caseSensitive: o.caseSensitive ?? !1,
        notFoundMode: o.notFoundMode ?? 'fuzzy',
        stringifySearch: o.stringifySearch ?? Ab,
        parseSearch: o.parseSearch ?? Cb,
      }),
      typeof document < 'u' && (self.__TSR_ROUTER__ = this))
  }
  isShell() {
    return !!this.options.isShell
  }
  isPrerendering() {
    return !!this.options.isPrerendering
  }
  get state() {
    return this.__store.state
  }
  get looseRoutesById() {
    return this.routesById
  }
  matchRoutesInternal(o, i) {
    const s = this.getMatchedRoutes(o.pathname),
      { foundRoute: c, routeParams: f } = s
    let { matchedRoutes: m } = s,
      h = !1
    ;(c ? c.path !== '/' && f['**'] : _a(o.pathname)) &&
      (this.options.notFoundRoute
        ? (m = [...m, this.options.notFoundRoute])
        : (h = !0))
    const p = (() => {
        if (h) {
          if (this.options.notFoundMode !== 'root')
            for (let g = m.length - 1; g >= 0; g--) {
              const S = m[g]
              if (S.children) return S.id
            }
          return Ce
        }
      })(),
      v = [],
      b = (g) =>
        g?.id
          ? (g.context ?? this.options.context ?? void 0)
          : (this.options.context ?? void 0)
    return (
      m.forEach((g, S) => {
        const T = v[S - 1],
          [N, M, O] = (() => {
            const Ht = T?.search ?? o.search,
              jt = T?._strictSearch ?? void 0
            try {
              const At = Vc(g.options.validateSearch, { ...Ht }) ?? void 0
              return [{ ...Ht, ...At }, { ...jt, ...At }, void 0]
            } catch (At) {
              let j = At
              if (
                (At instanceof kr || (j = new kr(At.message, { cause: At })),
                i?.throwOnError)
              )
                throw j
              return [Ht, {}, j]
            }
          })(),
          U = g.options.loaderDeps?.({ search: N }) ?? '',
          Q = U ? JSON.stringify(U) : '',
          { interpolatedPath: K, usedParams: X } = pc({
            path: g.fullPath,
            params: f,
            decodeCharMap: this.pathParamsDecodeCharMap,
          }),
          W = g.id + K + Q,
          G = this.getMatch(W),
          Y = this.state.matches.find((Ht) => Ht.routeId === g.id),
          B = G?._strictParams ?? X
        let $
        if (!G) {
          const Ht = g.options.params?.parse ?? g.options.parseParams
          if (Ht)
            try {
              Object.assign(B, Ht(B))
            } catch (jt) {
              if (
                (qe(jt) || Xe(jt)
                  ? ($ = jt)
                  : ($ = new Hb(jt.message, { cause: jt })),
                i?.throwOnError)
              )
                throw $
            }
        }
        Object.assign(f, B)
        const ut = Y ? 'stay' : 'enter'
        let st
        if (G)
          st = {
            ...G,
            cause: ut,
            params: Y ? ke(Y.params, f) : f,
            _strictParams: B,
            search: ke(Y ? Y.search : G.search, N),
            _strictSearch: M,
          }
        else {
          const Ht =
            g.options.loader || g.options.beforeLoad || g.lazyFn || gv(g)
              ? 'pending'
              : 'success'
          st = {
            id: W,
            ssr: this.isServer ? void 0 : g.options.ssr,
            index: S,
            routeId: g.id,
            params: Y ? ke(Y.params, f) : f,
            _strictParams: B,
            pathname: K,
            updatedAt: Date.now(),
            search: Y ? ke(Y.search, N) : N,
            _strictSearch: M,
            searchError: void 0,
            status: Ht,
            isFetching: !1,
            error: void 0,
            paramsError: $,
            __routeContext: void 0,
            _nonReactive: { loadPromise: Cl() },
            __beforeLoadContext: void 0,
            context: {},
            abortController: new AbortController(),
            fetchCount: 0,
            cause: ut,
            loaderDeps: Y ? ke(Y.loaderDeps, U) : U,
            invalid: !1,
            preload: !1,
            links: void 0,
            scripts: void 0,
            headScripts: void 0,
            meta: void 0,
            staticData: g.options.staticData || {},
            fullPath: g.fullPath,
          }
        }
        ;(i?.preload || (st.globalNotFound = p === g.id), (st.searchError = O))
        const vt = b(T)
        ;((st.context = {
          ...vt,
          ...st.__routeContext,
          ...st.__beforeLoadContext,
        }),
          v.push(st))
      }),
      v.forEach((g, S) => {
        const T = this.looseRoutesById[g.routeId]
        if (!this.getMatch(g.id) && i?._buildLocation !== !0) {
          const M = v[S - 1],
            O = b(M)
          if (T.options.context) {
            const U = {
              deps: g.loaderDeps,
              params: g.params,
              context: O ?? {},
              location: o,
              navigate: (Q) => this.navigate({ ...Q, _fromLocation: o }),
              buildLocation: this.buildLocation,
              cause: g.cause,
              abortController: g.abortController,
              preload: !!g.preload,
              matches: v,
            }
            g.__routeContext = T.options.context(U) ?? void 0
          }
          g.context = { ...O, ...g.__routeContext, ...g.__beforeLoadContext }
        }
      }),
      v
    )
  }
}
class kr extends Error {}
class Hb extends Error {}
function kb(a) {
  return {
    loadedAt: 0,
    isLoading: !1,
    isTransitioning: !1,
    status: 'idle',
    resolvedLocation: void 0,
    location: a,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200,
  }
}
function Vc(a, o) {
  if (a == null) return {}
  if ('~standard' in a) {
    const i = a['~standard'].validate(o)
    if (i instanceof Promise) throw new kr('Async validation not supported')
    if (i.issues)
      throw new kr(JSON.stringify(i.issues, void 0, 2), { cause: i })
    return i.value
  }
  return 'parse' in a ? a.parse(o) : typeof a == 'function' ? a(o) : {}
}
function qb({ pathname: a, routesById: o, processedTree: i }) {
  const s = {},
    c = _a(a)
  let f
  const m = sb(c, i, !0)
  return (
    m && ((f = m.route), Object.assign(s, m.params)),
    { matchedRoutes: m?.branch || [o[Ce]], routeParams: s, foundRoute: f }
  )
}
function Yb({ search: a, dest: o, destRoutes: i, _includeValidateSearch: s }) {
  const c =
      i.reduce((h, p) => {
        const v = []
        if ('search' in p.options)
          p.options.search?.middlewares &&
            v.push(...p.options.search.middlewares)
        else if (p.options.preSearchFilters || p.options.postSearchFilters) {
          const b = ({ search: g, next: S }) => {
            let T = g
            'preSearchFilters' in p.options &&
              p.options.preSearchFilters &&
              (T = p.options.preSearchFilters.reduce((M, O) => O(M), g))
            const N = S(T)
            return 'postSearchFilters' in p.options &&
              p.options.postSearchFilters
              ? p.options.postSearchFilters.reduce((M, O) => O(M), N)
              : N
          }
          v.push(b)
        }
        if (s && p.options.validateSearch) {
          const b = ({ search: g, next: S }) => {
            const T = S(g)
            try {
              return { ...T, ...(Vc(p.options.validateSearch, T) ?? void 0) }
            } catch {
              return T
            }
          }
          v.push(b)
        }
        return h.concat(v)
      }, []) ?? [],
    f = ({ search: h }) =>
      o.search ? (o.search === !0 ? h : Wn(o.search, h)) : {}
  c.push(f)
  const m = (h, p) => {
    if (h >= c.length) return p
    const v = c[h]
    return v({ search: p, next: (g) => m(h + 1, g) })
  }
  return m(0, a)
}
const Gb = 'Error preloading route! ☝️'
class xv {
  constructor(o) {
    if (
      ((this.init = (i) => {
        this.originalIndex = i.originalIndex
        const s = this.options,
          c = !s?.path && !s?.id
        ;((this.parentRoute = this.options.getParentRoute?.()),
          c ? (this._path = Ce) : this.parentRoute || Sn(!1))
        let f = c ? Ce : s?.path
        f && f !== '/' && (f = sv(f))
        const m = s?.id || f
        let h = c
          ? Ce
          : Ar([this.parentRoute.id === Ce ? '' : this.parentRoute.id, m])
        ;(f === Ce && (f = '/'), h !== Ce && (h = Ar(['/', h])))
        const p = h === Ce ? '/' : Ar([this.parentRoute.fullPath, f])
        ;((this._path = f),
          (this._id = h),
          (this._fullPath = p),
          (this._to = p))
      }),
      (this.addChildren = (i) => this._addFileChildren(i)),
      (this._addFileChildren = (i) => (
        Array.isArray(i) && (this.children = i),
        typeof i == 'object' &&
          i !== null &&
          (this.children = Object.values(i)),
        this
      )),
      (this._addFileTypes = () => this),
      (this.updateLoader = (i) => (Object.assign(this.options, i), this)),
      (this.update = (i) => (Object.assign(this.options, i), this)),
      (this.lazy = (i) => ((this.lazyFn = i), this)),
      (this.options = o || {}),
      (this.isRoot = !o?.getParentRoute),
      o?.id && o?.path)
    )
      throw new Error("Route cannot have both an 'id' and a 'path' option.")
  }
  get to() {
    return this._to
  }
  get id() {
    return this._id
  }
  get path() {
    return this._path
  }
  get fullPath() {
    return this._fullPath
  }
}
class Vb extends xv {
  constructor(o) {
    super(o)
  }
}
var gc = { exports: {} },
  ct = {}
var Ep
function Xb() {
  if (Ep) return ct
  Ep = 1
  var a = Symbol.for('react.transitional.element'),
    o = Symbol.for('react.portal'),
    i = Symbol.for('react.fragment'),
    s = Symbol.for('react.strict_mode'),
    c = Symbol.for('react.profiler'),
    f = Symbol.for('react.consumer'),
    m = Symbol.for('react.context'),
    h = Symbol.for('react.forward_ref'),
    p = Symbol.for('react.suspense'),
    v = Symbol.for('react.memo'),
    b = Symbol.for('react.lazy'),
    g = Symbol.for('react.activity'),
    S = Symbol.iterator
  function T(C) {
    return C === null || typeof C != 'object'
      ? null
      : ((C = (S && C[S]) || C['@@iterator']),
        typeof C == 'function' ? C : null)
  }
  var N = {
      isMounted: function () {
        return !1
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    M = Object.assign,
    O = {}
  function U(C, q, P) {
    ;((this.props = C),
      (this.context = q),
      (this.refs = O),
      (this.updater = P || N))
  }
  ;((U.prototype.isReactComponent = {}),
    (U.prototype.setState = function (C, q) {
      if (typeof C != 'object' && typeof C != 'function' && C != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.',
        )
      this.updater.enqueueSetState(this, C, q, 'setState')
    }),
    (U.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, 'forceUpdate')
    }))
  function Q() {}
  Q.prototype = U.prototype
  function K(C, q, P) {
    ;((this.props = C),
      (this.context = q),
      (this.refs = O),
      (this.updater = P || N))
  }
  var X = (K.prototype = new Q())
  ;((X.constructor = K), M(X, U.prototype), (X.isPureReactComponent = !0))
  var W = Array.isArray
  function G() {}
  var Y = { H: null, A: null, T: null, S: null },
    B = Object.prototype.hasOwnProperty
  function $(C, q, P) {
    var F = P.ref
    return {
      $$typeof: a,
      type: C,
      key: q,
      ref: F !== void 0 ? F : null,
      props: P,
    }
  }
  function ut(C, q) {
    return $(C.type, q, C.props)
  }
  function st(C) {
    return typeof C == 'object' && C !== null && C.$$typeof === a
  }
  function vt(C) {
    var q = { '=': '=0', ':': '=2' }
    return (
      '$' +
      C.replace(/[=:]/g, function (P) {
        return q[P]
      })
    )
  }
  var Ht = /\/+/g
  function jt(C, q) {
    return typeof C == 'object' && C !== null && C.key != null
      ? vt('' + C.key)
      : q.toString(36)
  }
  function At(C) {
    switch (C.status) {
      case 'fulfilled':
        return C.value
      case 'rejected':
        throw C.reason
      default:
        switch (
          (typeof C.status == 'string'
            ? C.then(G, G)
            : ((C.status = 'pending'),
              C.then(
                function (q) {
                  C.status === 'pending' &&
                    ((C.status = 'fulfilled'), (C.value = q))
                },
                function (q) {
                  C.status === 'pending' &&
                    ((C.status = 'rejected'), (C.reason = q))
                },
              )),
          C.status)
        ) {
          case 'fulfilled':
            return C.value
          case 'rejected':
            throw C.reason
        }
    }
    throw C
  }
  function j(C, q, P, F, it) {
    var rt = typeof C
    ;(rt === 'undefined' || rt === 'boolean') && (C = null)
    var lt = !1
    if (C === null) lt = !0
    else
      switch (rt) {
        case 'bigint':
        case 'string':
        case 'number':
          lt = !0
          break
        case 'object':
          switch (C.$$typeof) {
            case a:
            case o:
              lt = !0
              break
            case b:
              return ((lt = C._init), j(lt(C._payload), q, P, F, it))
          }
      }
    if (lt)
      return (
        (it = it(C)),
        (lt = F === '' ? '.' + jt(C, 0) : F),
        W(it)
          ? ((P = ''),
            lt != null && (P = lt.replace(Ht, '$&/') + '/'),
            j(it, q, P, '', function (re) {
              return re
            }))
          : it != null &&
            (st(it) &&
              (it = ut(
                it,
                P +
                  (it.key == null || (C && C.key === it.key)
                    ? ''
                    : ('' + it.key).replace(Ht, '$&/') + '/') +
                  lt,
              )),
            q.push(it)),
        1
      )
    lt = 0
    var qt = F === '' ? '.' : F + ':'
    if (W(C))
      for (var St = 0; St < C.length; St++)
        ((F = C[St]), (rt = qt + jt(F, St)), (lt += j(F, q, P, rt, it)))
    else if (((St = T(C)), typeof St == 'function'))
      for (C = St.call(C), St = 0; !(F = C.next()).done; )
        ((F = F.value), (rt = qt + jt(F, St++)), (lt += j(F, q, P, rt, it)))
    else if (rt === 'object') {
      if (typeof C.then == 'function') return j(At(C), q, P, F, it)
      throw (
        (q = String(C)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (q === '[object Object]'
              ? 'object with keys {' + Object.keys(C).join(', ') + '}'
              : q) +
            '). If you meant to render a collection of children, use an array instead.',
        )
      )
    }
    return lt
  }
  function J(C, q, P) {
    if (C == null) return C
    var F = [],
      it = 0
    return (
      j(C, F, '', '', function (rt) {
        return q.call(P, rt, it++)
      }),
      F
    )
  }
  function Z(C) {
    if (C._status === -1) {
      var q = C._result
      ;((q = q()),
        q.then(
          function (P) {
            ;(C._status === 0 || C._status === -1) &&
              ((C._status = 1), (C._result = P))
          },
          function (P) {
            ;(C._status === 0 || C._status === -1) &&
              ((C._status = 2), (C._result = P))
          },
        ),
        C._status === -1 && ((C._status = 0), (C._result = q)))
    }
    if (C._status === 1) return C._result.default
    throw C._result
  }
  var xt =
      typeof reportError == 'function'
        ? reportError
        : function (C) {
            if (
              typeof window == 'object' &&
              typeof window.ErrorEvent == 'function'
            ) {
              var q = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof C == 'object' &&
                  C !== null &&
                  typeof C.message == 'string'
                    ? String(C.message)
                    : String(C),
                error: C,
              })
              if (!window.dispatchEvent(q)) return
            } else if (
              typeof process == 'object' &&
              typeof process.emit == 'function'
            ) {
              process.emit('uncaughtException', C)
              return
            }
            console.error(C)
          },
    Rt = {
      map: J,
      forEach: function (C, q, P) {
        J(
          C,
          function () {
            q.apply(this, arguments)
          },
          P,
        )
      },
      count: function (C) {
        var q = 0
        return (
          J(C, function () {
            q++
          }),
          q
        )
      },
      toArray: function (C) {
        return (
          J(C, function (q) {
            return q
          }) || []
        )
      },
      only: function (C) {
        if (!st(C))
          throw Error(
            'React.Children.only expected to receive a single React element child.',
          )
        return C
      },
    }
  return (
    (ct.Activity = g),
    (ct.Children = Rt),
    (ct.Component = U),
    (ct.Fragment = i),
    (ct.Profiler = c),
    (ct.PureComponent = K),
    (ct.StrictMode = s),
    (ct.Suspense = p),
    (ct.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Y),
    (ct.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return Y.H.useMemoCache(C)
      },
    }),
    (ct.cache = function (C) {
      return function () {
        return C.apply(null, arguments)
      }
    }),
    (ct.cacheSignal = function () {
      return null
    }),
    (ct.cloneElement = function (C, q, P) {
      if (C == null)
        throw Error(
          'The argument must be a React element, but you passed ' + C + '.',
        )
      var F = M({}, C.props),
        it = C.key
      if (q != null)
        for (rt in (q.key !== void 0 && (it = '' + q.key), q))
          !B.call(q, rt) ||
            rt === 'key' ||
            rt === '__self' ||
            rt === '__source' ||
            (rt === 'ref' && q.ref === void 0) ||
            (F[rt] = q[rt])
      var rt = arguments.length - 2
      if (rt === 1) F.children = P
      else if (1 < rt) {
        for (var lt = Array(rt), qt = 0; qt < rt; qt++)
          lt[qt] = arguments[qt + 2]
        F.children = lt
      }
      return $(C.type, it, F)
    }),
    (ct.createContext = function (C) {
      return (
        (C = {
          $$typeof: m,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: f, _context: C }),
        C
      )
    }),
    (ct.createElement = function (C, q, P) {
      var F,
        it = {},
        rt = null
      if (q != null)
        for (F in (q.key !== void 0 && (rt = '' + q.key), q))
          B.call(q, F) &&
            F !== 'key' &&
            F !== '__self' &&
            F !== '__source' &&
            (it[F] = q[F])
      var lt = arguments.length - 2
      if (lt === 1) it.children = P
      else if (1 < lt) {
        for (var qt = Array(lt), St = 0; St < lt; St++)
          qt[St] = arguments[St + 2]
        it.children = qt
      }
      if (C && C.defaultProps)
        for (F in ((lt = C.defaultProps), lt))
          it[F] === void 0 && (it[F] = lt[F])
      return $(C, rt, it)
    }),
    (ct.createRef = function () {
      return { current: null }
    }),
    (ct.forwardRef = function (C) {
      return { $$typeof: h, render: C }
    }),
    (ct.isValidElement = st),
    (ct.lazy = function (C) {
      return { $$typeof: b, _payload: { _status: -1, _result: C }, _init: Z }
    }),
    (ct.memo = function (C, q) {
      return { $$typeof: v, type: C, compare: q === void 0 ? null : q }
    }),
    (ct.startTransition = function (C) {
      var q = Y.T,
        P = {}
      Y.T = P
      try {
        var F = C(),
          it = Y.S
        ;(it !== null && it(P, F),
          typeof F == 'object' &&
            F !== null &&
            typeof F.then == 'function' &&
            F.then(G, xt))
      } catch (rt) {
        xt(rt)
      } finally {
        ;(q !== null && P.types !== null && (q.types = P.types), (Y.T = q))
      }
    }),
    (ct.unstable_useCacheRefresh = function () {
      return Y.H.useCacheRefresh()
    }),
    (ct.use = function (C) {
      return Y.H.use(C)
    }),
    (ct.useActionState = function (C, q, P) {
      return Y.H.useActionState(C, q, P)
    }),
    (ct.useCallback = function (C, q) {
      return Y.H.useCallback(C, q)
    }),
    (ct.useContext = function (C) {
      return Y.H.useContext(C)
    }),
    (ct.useDebugValue = function () {}),
    (ct.useDeferredValue = function (C, q) {
      return Y.H.useDeferredValue(C, q)
    }),
    (ct.useEffect = function (C, q) {
      return Y.H.useEffect(C, q)
    }),
    (ct.useEffectEvent = function (C) {
      return Y.H.useEffectEvent(C)
    }),
    (ct.useId = function () {
      return Y.H.useId()
    }),
    (ct.useImperativeHandle = function (C, q, P) {
      return Y.H.useImperativeHandle(C, q, P)
    }),
    (ct.useInsertionEffect = function (C, q) {
      return Y.H.useInsertionEffect(C, q)
    }),
    (ct.useLayoutEffect = function (C, q) {
      return Y.H.useLayoutEffect(C, q)
    }),
    (ct.useMemo = function (C, q) {
      return Y.H.useMemo(C, q)
    }),
    (ct.useOptimistic = function (C, q) {
      return Y.H.useOptimistic(C, q)
    }),
    (ct.useReducer = function (C, q, P) {
      return Y.H.useReducer(C, q, P)
    }),
    (ct.useRef = function (C) {
      return Y.H.useRef(C)
    }),
    (ct.useState = function (C) {
      return Y.H.useState(C)
    }),
    (ct.useSyncExternalStore = function (C, q, P) {
      return Y.H.useSyncExternalStore(C, q, P)
    }),
    (ct.useTransition = function () {
      return Y.H.useTransition()
    }),
    (ct.version = '19.2.3'),
    ct
  )
}
var _p
function Vi() {
  return (_p || ((_p = 1), (gc.exports = Xb())), gc.exports)
}
var x = Vi()
const Ml = Kc(x),
  Ic = V0({ __proto__: null, default: Ml }, [x])
function tf(a) {
  const o = a.errorComponent ?? Qr
  return _.jsx(Qb, {
    getResetKey: a.getResetKey,
    onCatch: a.onCatch,
    children: ({ error: i, reset: s }) =>
      i ? x.createElement(o, { error: i, reset: s }) : a.children,
  })
}
class Qb extends x.Component {
  constructor() {
    ;(super(...arguments), (this.state = { error: null }))
  }
  static getDerivedStateFromProps(o) {
    return { resetKey: o.getResetKey() }
  }
  static getDerivedStateFromError(o) {
    return { error: o }
  }
  reset() {
    this.setState({ error: null })
  }
  componentDidUpdate(o, i) {
    i.error && i.resetKey !== this.state.resetKey && this.reset()
  }
  componentDidCatch(o, i) {
    this.props.onCatch && this.props.onCatch(o, i)
  }
  render() {
    return this.props.children({
      error:
        this.state.resetKey !== this.props.getResetKey()
          ? null
          : this.state.error,
      reset: () => {
        this.reset()
      },
    })
  }
}
function Qr({ error: a }) {
  const [o, i] = x.useState(!1)
  return _.jsxs('div', {
    style: { padding: '.5rem', maxWidth: '100%' },
    children: [
      _.jsxs('div', {
        style: { display: 'flex', alignItems: 'center', gap: '.5rem' },
        children: [
          _.jsx('strong', {
            style: { fontSize: '1rem' },
            children: 'Something went wrong!',
          }),
          _.jsx('button', {
            style: {
              appearance: 'none',
              fontSize: '.6em',
              border: '1px solid currentColor',
              padding: '.1rem .2rem',
              fontWeight: 'bold',
              borderRadius: '.25rem',
            },
            onClick: () => i((s) => !s),
            children: o ? 'Hide Error' : 'Show Error',
          }),
        ],
      }),
      _.jsx('div', { style: { height: '.25rem' } }),
      o
        ? _.jsx('div', {
            children: _.jsx('pre', {
              style: {
                fontSize: '.7em',
                border: '1px solid red',
                borderRadius: '.25rem',
                padding: '.3rem',
                color: 'red',
                overflow: 'auto',
              },
              children: a.message
                ? _.jsx('code', { children: a.message })
                : null,
            }),
          })
        : null,
    ],
  })
}
function Zb({ children: a, fallback: o = null }) {
  return Kb()
    ? _.jsx(Ml.Fragment, { children: a })
    : _.jsx(Ml.Fragment, { children: o })
}
function Kb() {
  return Ml.useSyncExternalStore(
    Pb,
    () => !0,
    () => !1,
  )
}
function Pb() {
  return () => {}
}
var yc = { exports: {} },
  bc = {},
  Sc = { exports: {} },
  xc = {}
var Rp
function Jb() {
  if (Rp) return xc
  Rp = 1
  var a = Vi()
  function o(g, S) {
    return (g === S && (g !== 0 || 1 / g === 1 / S)) || (g !== g && S !== S)
  }
  var i = typeof Object.is == 'function' ? Object.is : o,
    s = a.useState,
    c = a.useEffect,
    f = a.useLayoutEffect,
    m = a.useDebugValue
  function h(g, S) {
    var T = S(),
      N = s({ inst: { value: T, getSnapshot: S } }),
      M = N[0].inst,
      O = N[1]
    return (
      f(
        function () {
          ;((M.value = T), (M.getSnapshot = S), p(M) && O({ inst: M }))
        },
        [g, T, S],
      ),
      c(
        function () {
          return (
            p(M) && O({ inst: M }),
            g(function () {
              p(M) && O({ inst: M })
            })
          )
        },
        [g],
      ),
      m(T),
      T
    )
  }
  function p(g) {
    var S = g.getSnapshot
    g = g.value
    try {
      var T = S()
      return !i(g, T)
    } catch {
      return !0
    }
  }
  function v(g, S) {
    return S()
  }
  var b =
    typeof window > 'u' ||
    typeof window.document > 'u' ||
    typeof window.document.createElement > 'u'
      ? v
      : h
  return (
    (xc.useSyncExternalStore =
      a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : b),
    xc
  )
}
var Tp
function Fb() {
  return (Tp || ((Tp = 1), (Sc.exports = Jb())), Sc.exports)
}
var Cp
function Wb() {
  if (Cp) return bc
  Cp = 1
  var a = Vi(),
    o = Fb()
  function i(v, b) {
    return (v === b && (v !== 0 || 1 / v === 1 / b)) || (v !== v && b !== b)
  }
  var s = typeof Object.is == 'function' ? Object.is : i,
    c = o.useSyncExternalStore,
    f = a.useRef,
    m = a.useEffect,
    h = a.useMemo,
    p = a.useDebugValue
  return (
    (bc.useSyncExternalStoreWithSelector = function (v, b, g, S, T) {
      var N = f(null)
      if (N.current === null) {
        var M = { hasValue: !1, value: null }
        N.current = M
      } else M = N.current
      N = h(
        function () {
          function U(G) {
            if (!Q) {
              if (((Q = !0), (K = G), (G = S(G)), T !== void 0 && M.hasValue)) {
                var Y = M.value
                if (T(Y, G)) return (X = Y)
              }
              return (X = G)
            }
            if (((Y = X), s(K, G))) return Y
            var B = S(G)
            return T !== void 0 && T(Y, B) ? ((K = G), Y) : ((K = G), (X = B))
          }
          var Q = !1,
            K,
            X,
            W = g === void 0 ? null : g
          return [
            function () {
              return U(b())
            },
            W === null
              ? void 0
              : function () {
                  return U(W())
                },
          ]
        },
        [b, g, S, T],
      )
      var O = c(v, N[0], N[1])
      return (
        m(
          function () {
            ;((M.hasValue = !0), (M.value = O))
          },
          [O],
        ),
        p(O),
        O
      )
    }),
    bc
  )
}
var Ap
function $b() {
  return (Ap || ((Ap = 1), (yc.exports = Wb())), yc.exports)
}
var Ib = $b()
function tS(a, o = (s) => s, i = {}) {
  const s = i.equal ?? eS
  return Ib.useSyncExternalStoreWithSelector(
    a.subscribe,
    () => a.state,
    () => a.state,
    o,
    s,
  )
}
function eS(a, o) {
  if (Object.is(a, o)) return !0
  if (typeof a != 'object' || a === null || typeof o != 'object' || o === null)
    return !1
  if (a instanceof Map && o instanceof Map) {
    if (a.size !== o.size) return !1
    for (const [s, c] of a) if (!o.has(s) || !Object.is(c, o.get(s))) return !1
    return !0
  }
  if (a instanceof Set && o instanceof Set) {
    if (a.size !== o.size) return !1
    for (const s of a) if (!o.has(s)) return !1
    return !0
  }
  if (a instanceof Date && o instanceof Date) return a.getTime() === o.getTime()
  const i = Mp(a)
  if (i.length !== Mp(o).length) return !1
  for (let s = 0; s < i.length; s++)
    if (
      !Object.prototype.hasOwnProperty.call(o, i[s]) ||
      !Object.is(a[i[s]], o[i[s]])
    )
      return !1
  return !0
}
function Mp(a) {
  return Object.keys(a).concat(Object.getOwnPropertySymbols(a))
}
const Ec = x.createContext(null)
function Ev() {
  return typeof document > 'u'
    ? Ec
    : window.__TSR_ROUTER_CONTEXT__
      ? window.__TSR_ROUTER_CONTEXT__
      : ((window.__TSR_ROUTER_CONTEXT__ = Ec), Ec)
}
function Ae(a) {
  const o = x.useContext(Ev())
  return (a?.warn, o)
}
function pe(a) {
  const o = Ae({ warn: a?.router === void 0 }),
    i = a?.router || o,
    s = x.useRef(void 0)
  return tS(i.__store, (c) => {
    if (a?.select) {
      if (a.structuralSharing ?? i.options.defaultStructuralSharing) {
        const f = ke(s.current, a.select(c))
        return ((s.current = f), f)
      }
      return a.select(c)
    }
    return c
  })
}
const Zr = x.createContext(void 0),
  nS = x.createContext(void 0)
function $e(a) {
  const o = x.useContext(a.from ? nS : Zr)
  return pe({
    select: (s) => {
      const c = s.matches.find((f) =>
        a.from ? a.from === f.routeId : f.id === o,
      )
      if (
        (Sn(
          !((a.shouldThrow ?? !0) && !c),
          `Could not find ${a.from ? `an active match from "${a.from}"` : 'a nearest match!'}`,
        ),
        c !== void 0)
      )
        return a.select ? a.select(c) : c
    },
    structuralSharing: a.structuralSharing,
  })
}
function ef(a) {
  return $e({
    from: a.from,
    strict: a.strict,
    structuralSharing: a.structuralSharing,
    select: (o) => (a.select ? a.select(o.loaderData) : o.loaderData),
  })
}
function nf(a) {
  const { select: o, ...i } = a
  return $e({ ...i, select: (s) => (o ? o(s.loaderDeps) : s.loaderDeps) })
}
function af(a) {
  return $e({
    from: a.from,
    shouldThrow: a.shouldThrow,
    structuralSharing: a.structuralSharing,
    strict: a.strict,
    select: (o) => {
      const i = a.strict === !1 ? o.params : o._strictParams
      return a.select ? a.select(i) : i
    },
  })
}
function lf(a) {
  return $e({
    from: a.from,
    strict: a.strict,
    shouldThrow: a.shouldThrow,
    structuralSharing: a.structuralSharing,
    select: (o) => (a.select ? a.select(o.search) : o.search),
  })
}
const gr = typeof window < 'u' ? x.useLayoutEffect : x.useEffect
function _c(a) {
  const o = x.useRef({ value: a, prev: null }),
    i = o.current.value
  return (a !== i && (o.current = { value: a, prev: i }), o.current.prev)
}
function aS(a, o, i = {}, s = {}) {
  x.useEffect(() => {
    if (!a.current || s.disabled || typeof IntersectionObserver != 'function')
      return
    const c = new IntersectionObserver(([f]) => {
      o(f)
    }, i)
    return (
      c.observe(a.current),
      () => {
        c.disconnect()
      }
    )
  }, [o, i, s.disabled, a])
}
function lS(a) {
  const o = x.useRef(null)
  return (x.useImperativeHandle(a, () => o.current, []), o)
}
function of(a) {
  const o = Ae()
  return x.useCallback(
    (i) => o.navigate({ ...i, from: i.from ?? a?.from }),
    [a?.from, o],
  )
}
var Rc = { exports: {} },
  ie = {}
var Op
function iS() {
  if (Op) return ie
  Op = 1
  var a = Vi()
  function o(p) {
    var v = 'https://react.dev/errors/' + p
    if (1 < arguments.length) {
      v += '?args[]=' + encodeURIComponent(arguments[1])
      for (var b = 2; b < arguments.length; b++)
        v += '&args[]=' + encodeURIComponent(arguments[b])
    }
    return (
      'Minified React error #' +
      p +
      '; visit ' +
      v +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    )
  }
  function i() {}
  var s = {
      d: {
        f: i,
        r: function () {
          throw Error(o(522))
        },
        D: i,
        C: i,
        L: i,
        m: i,
        X: i,
        S: i,
        M: i,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for('react.portal')
  function f(p, v, b) {
    var g =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null
    return {
      $$typeof: c,
      key: g == null ? null : '' + g,
      children: p,
      containerInfo: v,
      implementation: b,
    }
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
  function h(p, v) {
    if (p === 'font') return ''
    if (typeof v == 'string') return v === 'use-credentials' ? v : ''
  }
  return (
    (ie.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (ie.createPortal = function (p, v) {
      var b =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null
      if (!v || (v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11))
        throw Error(o(299))
      return f(p, v, null, b)
    }),
    (ie.flushSync = function (p) {
      var v = m.T,
        b = s.p
      try {
        if (((m.T = null), (s.p = 2), p)) return p()
      } finally {
        ;((m.T = v), (s.p = b), s.d.f())
      }
    }),
    (ie.preconnect = function (p, v) {
      typeof p == 'string' &&
        (v
          ? ((v = v.crossOrigin),
            (v =
              typeof v == 'string'
                ? v === 'use-credentials'
                  ? v
                  : ''
                : void 0))
          : (v = null),
        s.d.C(p, v))
    }),
    (ie.prefetchDNS = function (p) {
      typeof p == 'string' && s.d.D(p)
    }),
    (ie.preinit = function (p, v) {
      if (typeof p == 'string' && v && typeof v.as == 'string') {
        var b = v.as,
          g = h(b, v.crossOrigin),
          S = typeof v.integrity == 'string' ? v.integrity : void 0,
          T = typeof v.fetchPriority == 'string' ? v.fetchPriority : void 0
        b === 'style'
          ? s.d.S(p, typeof v.precedence == 'string' ? v.precedence : void 0, {
              crossOrigin: g,
              integrity: S,
              fetchPriority: T,
            })
          : b === 'script' &&
            s.d.X(p, {
              crossOrigin: g,
              integrity: S,
              fetchPriority: T,
              nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
            })
      }
    }),
    (ie.preinitModule = function (p, v) {
      if (typeof p == 'string')
        if (typeof v == 'object' && v !== null) {
          if (v.as == null || v.as === 'script') {
            var b = h(v.as, v.crossOrigin)
            s.d.M(p, {
              crossOrigin: b,
              integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
              nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
            })
          }
        } else v == null && s.d.M(p)
    }),
    (ie.preload = function (p, v) {
      if (
        typeof p == 'string' &&
        typeof v == 'object' &&
        v !== null &&
        typeof v.as == 'string'
      ) {
        var b = v.as,
          g = h(b, v.crossOrigin)
        s.d.L(p, b, {
          crossOrigin: g,
          integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
          nonce: typeof v.nonce == 'string' ? v.nonce : void 0,
          type: typeof v.type == 'string' ? v.type : void 0,
          fetchPriority:
            typeof v.fetchPriority == 'string' ? v.fetchPriority : void 0,
          referrerPolicy:
            typeof v.referrerPolicy == 'string' ? v.referrerPolicy : void 0,
          imageSrcSet:
            typeof v.imageSrcSet == 'string' ? v.imageSrcSet : void 0,
          imageSizes: typeof v.imageSizes == 'string' ? v.imageSizes : void 0,
          media: typeof v.media == 'string' ? v.media : void 0,
        })
      }
    }),
    (ie.preloadModule = function (p, v) {
      if (typeof p == 'string')
        if (v) {
          var b = h(v.as, v.crossOrigin)
          s.d.m(p, {
            as: typeof v.as == 'string' && v.as !== 'script' ? v.as : void 0,
            crossOrigin: b,
            integrity: typeof v.integrity == 'string' ? v.integrity : void 0,
          })
        } else s.d.m(p)
    }),
    (ie.requestFormReset = function (p) {
      s.d.r(p)
    }),
    (ie.unstable_batchedUpdates = function (p, v) {
      return p(v)
    }),
    (ie.useFormState = function (p, v, b) {
      return m.H.useFormState(p, v, b)
    }),
    (ie.useFormStatus = function () {
      return m.H.useHostTransitionStatus()
    }),
    (ie.version = '19.2.3'),
    ie
  )
}
var wp
function _v() {
  if (wp) return Rc.exports
  wp = 1
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)
      } catch (o) {
        console.error(o)
      }
  }
  return (a(), (Rc.exports = iS()), Rc.exports)
}
var rf = _v()
const oS = Kc(rf)
function rS(a, o) {
  const i = Ae(),
    [s, c] = x.useState(!1),
    f = x.useRef(!1),
    m = lS(o),
    {
      activeProps: h,
      inactiveProps: p,
      activeOptions: v,
      to: b,
      preload: g,
      preloadDelay: S,
      hashScrollIntoView: T,
      replace: N,
      startTransition: M,
      resetScroll: O,
      viewTransition: U,
      children: Q,
      target: K,
      disabled: X,
      style: W,
      className: G,
      onClick: Y,
      onFocus: B,
      onMouseEnter: $,
      onMouseLeave: ut,
      onTouchStart: st,
      ignoreBlocker: vt,
      params: Ht,
      search: jt,
      hash: At,
      state: j,
      mask: J,
      reloadDocument: Z,
      unsafeRelative: xt,
      from: Rt,
      _fromLocation: C,
      ...q
    } = a,
    P = pe({ select: (wt) => wt.location.search, structuralSharing: !0 }),
    F = a.from,
    it = x.useMemo(
      () => ({ ...a, from: F }),
      [
        i,
        P,
        F,
        a._fromLocation,
        a.hash,
        a.to,
        a.search,
        a.params,
        a.state,
        a.mask,
        a.unsafeRelative,
      ],
    ),
    rt = x.useMemo(() => i.buildLocation({ ...it }), [i, it]),
    lt = x.useMemo(() => {
      if (X) return
      let wt = rt.maskedLocation ? rt.maskedLocation.url.href : rt.url.href,
        Tt = !1
      return (
        i.origin &&
          (wt.startsWith(i.origin)
            ? (wt = i.history.createHref(wt.replace(i.origin, '')) || '/')
            : (Tt = !0)),
        { href: wt, external: Tt }
      )
    }, [X, rt.maskedLocation, rt.url, i.origin, i.history]),
    qt = x.useMemo(() => {
      if (lt?.external) return lt.href
      try {
        return (new URL(b), b)
      } catch {}
    }, [b, lt]),
    St = a.reloadDocument || qt ? !1 : (g ?? i.options.defaultPreload),
    re = S ?? i.options.defaultPreloadDelay ?? 0,
    Me = pe({
      select: (wt) => {
        if (qt) return !1
        if (v?.exact) {
          if (!pb(wt.location.pathname, rt.pathname, i.basepath)) return !1
        } else {
          const Tt = Ur(wt.location.pathname, i.basepath),
            ve = Ur(rt.pathname, i.basepath)
          if (
            !(
              Tt.startsWith(ve) &&
              (Tt.length === ve.length || Tt[ve.length] === '/')
            )
          )
            return !1
        }
        return (v?.includeSearch ?? !0) &&
          !Ea(wt.location.search, rt.search, {
            partial: !v?.exact,
            ignoreUndefined: !v?.explicitUndefined,
          })
          ? !1
          : v?.includeHash
            ? wt.location.hash === rt.hash
            : !0
      },
    }),
    le = x.useCallback(() => {
      i.preloadRoute({ ...it }).catch((wt) => {
        ;(console.warn(wt), console.warn(Gb))
      })
    }, [i, it]),
    Zi = x.useCallback(
      (wt) => {
        wt?.isIntersecting && le()
      },
      [le],
    )
  ;(aS(m, Zi, dS, { disabled: !!X || St !== 'viewport' }),
    x.useEffect(() => {
      f.current || (!X && St === 'render' && (le(), (f.current = !0)))
    }, [X, le, St]))
  const Ie = (wt) => {
    const Tt = wt.currentTarget.getAttribute('target'),
      ve = K !== void 0 ? K : Tt
    if (
      !X &&
      !hS(wt) &&
      !wt.defaultPrevented &&
      (!ve || ve === '_self') &&
      wt.button === 0
    ) {
      ;(wt.preventDefault(),
        rf.flushSync(() => {
          c(!0)
        }))
      const jl = i.subscribe('onResolved', () => {
        ;(jl(), c(!1))
      })
      i.navigate({
        ...it,
        replace: N,
        resetScroll: O,
        hashScrollIntoView: T,
        startTransition: M,
        viewTransition: U,
        ignoreBlocker: vt,
      })
    }
  }
  if (qt)
    return {
      ...q,
      ref: m,
      href: qt,
      ...(Q && { children: Q }),
      ...(K && { target: K }),
      ...(X && { disabled: X }),
      ...(W && { style: W }),
      ...(G && { className: G }),
      ...(Y && { onClick: Y }),
      ...(B && { onFocus: B }),
      ...($ && { onMouseEnter: $ }),
      ...(ut && { onMouseLeave: ut }),
      ...(st && { onTouchStart: st }),
    }
  const wa = (wt) => {
      X || (St && le())
    },
    Ll = wa,
    Wr = (wt) => {
      if (!(X || !St))
        if (!re) le()
        else {
          const Tt = wt.target
          if (wi.has(Tt)) return
          const ve = setTimeout(() => {
            ;(wi.delete(Tt), le())
          }, re)
          wi.set(Tt, ve)
        }
    },
    Ki = (wt) => {
      if (X || !St || !re) return
      const Tt = wt.target,
        ve = wi.get(Tt)
      ve && (clearTimeout(ve), wi.delete(Tt))
    },
    En = Me ? (Wn(h, {}) ?? sS) : Tc,
    _n = Me ? Tc : (Wn(p, {}) ?? Tc),
    za = [G, En.className, _n.className].filter(Boolean).join(' '),
    Pi = (W || En.style || _n.style) && { ...W, ...En.style, ..._n.style }
  return {
    ...q,
    ...En,
    ..._n,
    href: lt?.href,
    ref: m,
    onClick: zi([Y, Ie]),
    onFocus: zi([B, wa]),
    onMouseEnter: zi([$, Wr]),
    onMouseLeave: zi([ut, Ki]),
    onTouchStart: zi([st, Ll]),
    disabled: !!X,
    target: K,
    ...(Pi && { style: Pi }),
    ...(za && { className: za }),
    ...(X && uS),
    ...(Me && cS),
    ...(s && fS),
  }
}
const Tc = {},
  sS = { className: 'active' },
  uS = { role: 'link', 'aria-disabled': !0 },
  cS = { 'data-status': 'active', 'aria-current': 'page' },
  fS = { 'data-transitioning': 'transitioning' },
  wi = new WeakMap(),
  dS = { rootMargin: '100px' },
  zi = (a) => (o) => {
    for (const i of a)
      if (i) {
        if (o.defaultPrevented) return
        i(o)
      }
  },
  Rv = x.forwardRef((a, o) => {
    const { _asChild: i, ...s } = a,
      { type: c, ref: f, ...m } = rS(s, o),
      h =
        typeof s.children == 'function'
          ? s.children({ isActive: m['data-status'] === 'active' })
          : s.children
    return (
      i === void 0 && delete m.disabled,
      x.createElement(i || 'a', { ...m, ref: f }, h)
    )
  })
function hS(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey)
}
let mS = class extends xv {
  constructor(o) {
    ;(super(o),
      (this.useMatch = (i) =>
        $e({
          select: i?.select,
          from: this.id,
          structuralSharing: i?.structuralSharing,
        })),
      (this.useRouteContext = (i) =>
        $e({
          ...i,
          from: this.id,
          select: (s) => (i?.select ? i.select(s.context) : s.context),
        })),
      (this.useSearch = (i) =>
        lf({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.id,
        })),
      (this.useParams = (i) =>
        af({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.id,
        })),
      (this.useLoaderDeps = (i) => nf({ ...i, from: this.id })),
      (this.useLoaderData = (i) => ef({ ...i, from: this.id })),
      (this.useNavigate = () => of({ from: this.fullPath })),
      (this.Link = Ml.forwardRef((i, s) =>
        _.jsx(Rv, { ref: s, from: this.fullPath, ...i }),
      )),
      (this.$$typeof = Symbol.for('react.memo')))
  }
}
function pS(a) {
  return new mS(a)
}
class vS extends Vb {
  constructor(o) {
    ;(super(o),
      (this.useMatch = (i) =>
        $e({
          select: i?.select,
          from: this.id,
          structuralSharing: i?.structuralSharing,
        })),
      (this.useRouteContext = (i) =>
        $e({
          ...i,
          from: this.id,
          select: (s) => (i?.select ? i.select(s.context) : s.context),
        })),
      (this.useSearch = (i) =>
        lf({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.id,
        })),
      (this.useParams = (i) =>
        af({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.id,
        })),
      (this.useLoaderDeps = (i) => nf({ ...i, from: this.id })),
      (this.useLoaderData = (i) => ef({ ...i, from: this.id })),
      (this.useNavigate = () => of({ from: this.fullPath })),
      (this.Link = Ml.forwardRef((i, s) =>
        _.jsx(Rv, { ref: s, from: this.fullPath, ...i }),
      )),
      (this.$$typeof = Symbol.for('react.memo')))
  }
}
function gS(a) {
  return new vS(a)
}
function xn(a) {
  return typeof a == 'object'
    ? new zp(a, { silent: !0 }).createRoute(a)
    : new zp(a, { silent: !0 }).createRoute
}
class zp {
  constructor(o, i) {
    ;((this.path = o),
      (this.createRoute = (s) => {
        this.silent
        const c = pS(s)
        return ((c.isRoot = !1), c)
      }),
      (this.silent = i?.silent))
  }
}
class Dp {
  constructor(o) {
    ;((this.useMatch = (i) =>
      $e({
        select: i?.select,
        from: this.options.id,
        structuralSharing: i?.structuralSharing,
      })),
      (this.useRouteContext = (i) =>
        $e({
          from: this.options.id,
          select: (s) => (i?.select ? i.select(s.context) : s.context),
        })),
      (this.useSearch = (i) =>
        lf({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.options.id,
        })),
      (this.useParams = (i) =>
        af({
          select: i?.select,
          structuralSharing: i?.structuralSharing,
          from: this.options.id,
        })),
      (this.useLoaderDeps = (i) => nf({ ...i, from: this.options.id })),
      (this.useLoaderData = (i) => ef({ ...i, from: this.options.id })),
      (this.useNavigate = () => {
        const i = Ae()
        return of({ from: i.routesById[this.options.id].fullPath })
      }),
      (this.options = o),
      (this.$$typeof = Symbol.for('react.memo')))
  }
}
function Np(a) {
  return typeof a == 'object' ? new Dp(a) : (o) => new Dp({ id: a, ...o })
}
function yS() {
  const a = Ae(),
    o = x.useRef({ router: a, mounted: !1 }),
    [i, s] = x.useState(!1),
    { hasPendingMatches: c, isLoading: f } = pe({
      select: (g) => ({
        isLoading: g.isLoading,
        hasPendingMatches: g.matches.some((S) => S.status === 'pending'),
      }),
      structuralSharing: !0,
    }),
    m = _c(f),
    h = f || i || c,
    p = _c(h),
    v = f || c,
    b = _c(v)
  return (
    (a.startTransition = (g) => {
      ;(s(!0),
        x.startTransition(() => {
          ;(g(), s(!1))
        }))
    }),
    x.useEffect(() => {
      const g = a.history.subscribe(a.load),
        S = a.buildLocation({
          to: a.latestLocation.pathname,
          search: !0,
          params: !0,
          hash: !0,
          state: !0,
          _includeValidateSearch: !0,
        })
      return (
        _a(a.latestLocation.href) !== _a(S.href) &&
          a.commitLocation({ ...S, replace: !0 }),
        () => {
          g()
        }
      )
    }, [a, a.history]),
    gr(() => {
      if (
        (typeof window < 'u' && a.ssr) ||
        (o.current.router === a && o.current.mounted)
      )
        return
      ;((o.current = { router: a, mounted: !0 }),
        (async () => {
          try {
            await a.load()
          } catch (S) {
            console.error(S)
          }
        })())
    }, [a]),
    gr(() => {
      m && !f && a.emit({ type: 'onLoad', ...Ra(a.state) })
    }, [m, a, f]),
    gr(() => {
      b && !v && a.emit({ type: 'onBeforeRouteMount', ...Ra(a.state) })
    }, [v, b, a]),
    gr(() => {
      if (p && !h) {
        const g = Ra(a.state)
        ;(a.emit({ type: 'onResolved', ...g }),
          a.__store.setState((S) => ({
            ...S,
            status: 'idle',
            resolvedLocation: S.location,
          })),
          g.hrefChanged && _b(a))
      }
    }, [h, p, a]),
    null
  )
}
function bS(a) {
  const o = pe({
    select: (i) => `not-found-${i.location.pathname}-${i.status}`,
  })
  return _.jsx(tf, {
    getResetKey: () => o,
    onCatch: (i, s) => {
      if (qe(i)) a.onCatch?.(i, s)
      else throw i
    },
    errorComponent: ({ error: i }) => {
      if (qe(i)) return a.fallback?.(i)
      throw i
    },
    children: a.children,
  })
}
function SS() {
  return _.jsx('p', { children: 'Not Found' })
}
function Sl(a) {
  return _.jsx(_.Fragment, { children: a.children })
}
function Tv(a, o, i) {
  return o.options.notFoundComponent
    ? _.jsx(o.options.notFoundComponent, { ...i })
    : a.options.defaultNotFoundComponent
      ? _.jsx(a.options.defaultNotFoundComponent, { ...i })
      : _.jsx(SS, {})
}
function xS({ children: a }) {
  const o = Ae()
  return o.isServer
    ? _.jsx('script', {
        nonce: o.options.ssr?.nonce,
        className: '$tsr',
        dangerouslySetInnerHTML: {
          __html: a + ';typeof $_TSR !== "undefined" && $_TSR.c()',
        },
      })
    : null
}
function ES() {
  const a = Ae()
  if (
    !a.isScrollRestoring ||
    !a.isServer ||
    (typeof a.options.scrollRestoration == 'function' &&
      !a.options.scrollRestoration({ location: a.latestLocation }))
  )
    return null
  const i = (a.options.getScrollRestorationKey || Gc)(a.latestLocation),
    s = i !== Gc(a.latestLocation) ? i : void 0,
    c = { storageKey: Br, shouldScrollRestoration: !0 }
  return (
    s && (c.key = s),
    _.jsx(xS, { children: `(${cv.toString()})(${JSON.stringify(c)})` })
  )
}
const Cv = x.memo(function ({ matchId: o }) {
  const i = Ae(),
    s = pe({
      select: (U) => {
        const Q = U.matches.find((K) => K.id === o)
        return (
          Sn(Q),
          { routeId: Q.routeId, ssr: Q.ssr, _displayPending: Q._displayPending }
        )
      },
      structuralSharing: !0,
    }),
    c = i.routesById[s.routeId],
    f = c.options.pendingComponent ?? i.options.defaultPendingComponent,
    m = f ? _.jsx(f, {}) : null,
    h = c.options.errorComponent ?? i.options.defaultErrorComponent,
    p = c.options.onCatch ?? i.options.defaultOnCatch,
    v = c.isRoot
      ? (c.options.notFoundComponent ??
        i.options.notFoundRoute?.options.component)
      : c.options.notFoundComponent,
    b = s.ssr === !1 || s.ssr === 'data-only',
    g =
      (!c.isRoot || c.options.wrapInSuspense || b) &&
      (c.options.wrapInSuspense ??
        f ??
        (c.options.errorComponent?.preload || b))
        ? x.Suspense
        : Sl,
    S = h ? tf : Sl,
    T = v ? bS : Sl,
    N = pe({ select: (U) => U.loadedAt }),
    M = pe({
      select: (U) => {
        const Q = U.matches.findIndex((K) => K.id === o)
        return U.matches[Q - 1]?.routeId
      },
    }),
    O = c.isRoot ? (c.options.shellComponent ?? Sl) : Sl
  return _.jsxs(O, {
    children: [
      _.jsx(Zr.Provider, {
        value: o,
        children: _.jsx(g, {
          fallback: m,
          children: _.jsx(S, {
            getResetKey: () => N,
            errorComponent: h || Qr,
            onCatch: (U, Q) => {
              if (qe(U)) throw U
              p?.(U, Q)
            },
            children: _.jsx(T, {
              fallback: (U) => {
                if (
                  !v ||
                  (U.routeId && U.routeId !== s.routeId) ||
                  (!U.routeId && !c.isRoot)
                )
                  throw U
                return x.createElement(v, U)
              },
              children:
                b || s._displayPending
                  ? _.jsx(Zb, {
                      fallback: m,
                      children: _.jsx(Lp, { matchId: o }),
                    })
                  : _.jsx(Lp, { matchId: o }),
            }),
          }),
        }),
      }),
      M === Ce && i.options.scrollRestoration
        ? _.jsxs(_.Fragment, { children: [_.jsx(_S, {}), _.jsx(ES, {})] })
        : null,
    ],
  })
})
function _S() {
  const a = Ae(),
    o = x.useRef(void 0)
  return _.jsx(
    'script',
    {
      suppressHydrationWarning: !0,
      ref: (i) => {
        i &&
          (o.current === void 0 || o.current.href !== a.latestLocation.href) &&
          (a.emit({ type: 'onRendered', ...Ra(a.state) }),
          (o.current = a.latestLocation))
      },
    },
    a.latestLocation.state.__TSR_key,
  )
}
const Lp = x.memo(function ({ matchId: o }) {
    const i = Ae(),
      {
        match: s,
        key: c,
        routeId: f,
      } = pe({
        select: (p) => {
          const v = p.matches.find((N) => N.id === o),
            b = v.routeId,
            S = (
              i.routesById[b].options.remountDeps ??
              i.options.defaultRemountDeps
            )?.({
              routeId: b,
              loaderDeps: v.loaderDeps,
              params: v._strictParams,
              search: v._strictSearch,
            })
          return {
            key: S ? JSON.stringify(S) : void 0,
            routeId: b,
            match: {
              id: v.id,
              status: v.status,
              error: v.error,
              _forcePending: v._forcePending,
              _displayPending: v._displayPending,
            },
          }
        },
        structuralSharing: !0,
      }),
      m = i.routesById[f],
      h = x.useMemo(() => {
        const p = m.options.component ?? i.options.defaultComponent
        return p ? _.jsx(p, {}, c) : _.jsx(Av, {})
      }, [c, m.options.component, i.options.defaultComponent])
    if (s._displayPending)
      throw i.getMatch(s.id)?._nonReactive.displayPendingPromise
    if (s._forcePending) throw i.getMatch(s.id)?._nonReactive.minPendingPromise
    if (s.status === 'pending') {
      const p = m.options.pendingMinMs ?? i.options.defaultPendingMinMs
      if (p) {
        const v = i.getMatch(s.id)
        if (v && !v._nonReactive.minPendingPromise && !i.isServer) {
          const b = Cl()
          ;((v._nonReactive.minPendingPromise = b),
            setTimeout(() => {
              ;(b.resolve(), (v._nonReactive.minPendingPromise = void 0))
            }, p))
        }
      }
      throw i.getMatch(s.id)?._nonReactive.loadPromise
    }
    if (s.status === 'notFound') return (Sn(qe(s.error)), Tv(i, m, s.error))
    if (s.status === 'redirected')
      throw (Sn(Xe(s.error)), i.getMatch(s.id)?._nonReactive.loadPromise)
    if (s.status === 'error') {
      if (i.isServer) {
        const p =
          (m.options.errorComponent ?? i.options.defaultErrorComponent) || Qr
        return _.jsx(p, {
          error: s.error,
          reset: void 0,
          info: { componentStack: '' },
        })
      }
      throw s.error
    }
    return h
  }),
  Av = x.memo(function () {
    const o = Ae(),
      i = x.useContext(Zr),
      s = pe({ select: (v) => v.matches.find((b) => b.id === i)?.routeId }),
      c = o.routesById[s],
      f = pe({
        select: (v) => {
          const g = v.matches.find((S) => S.id === i)
          return (Sn(g), g.globalNotFound)
        },
      }),
      m = pe({
        select: (v) => {
          const b = v.matches,
            g = b.findIndex((S) => S.id === i)
          return b[g + 1]?.id
        },
      }),
      h = o.options.defaultPendingComponent
        ? _.jsx(o.options.defaultPendingComponent, {})
        : null
    if (f) return Tv(o, c, void 0)
    if (!m) return null
    const p = _.jsx(Cv, { matchId: m })
    return s === Ce ? _.jsx(x.Suspense, { fallback: h, children: p }) : p
  })
function RS() {
  const a = Ae(),
    i =
      a.routesById[Ce].options.pendingComponent ??
      a.options.defaultPendingComponent,
    s = i ? _.jsx(i, {}) : null,
    c = a.isServer || (typeof document < 'u' && a.ssr) ? Sl : x.Suspense,
    f = _.jsxs(c, {
      fallback: s,
      children: [!a.isServer && _.jsx(yS, {}), _.jsx(TS, {})],
    })
  return a.options.InnerWrap ? _.jsx(a.options.InnerWrap, { children: f }) : f
}
function TS() {
  const a = Ae(),
    o = pe({ select: (c) => c.matches[0]?.id }),
    i = pe({ select: (c) => c.loadedAt }),
    s = o ? _.jsx(Cv, { matchId: o }) : null
  return _.jsx(Zr.Provider, {
    value: o,
    children: a.options.disableGlobalCatchBoundary
      ? s
      : _.jsx(tf, {
          getResetKey: () => i,
          errorComponent: Qr,
          onCatch: (c) => {
            c.message || c.toString()
          },
          children: s,
        }),
  })
}
const CS = (a) => new AS(a)
class AS extends Bb {
  constructor(o) {
    super(o)
  }
}
typeof globalThis < 'u'
  ? ((globalThis.createFileRoute = xn), (globalThis.createLazyFileRoute = Np))
  : typeof window < 'u' &&
    ((window.createFileRoute = xn), (window.createLazyFileRoute = Np))
function MS({ router: a, children: o, ...i }) {
  Object.keys(i).length > 0 &&
    a.update({
      ...a.options,
      ...i,
      context: { ...a.options.context, ...i.context },
    })
  const s = Ev(),
    c = _.jsx(s.Provider, { value: a, children: o })
  return a.options.Wrap ? _.jsx(a.options.Wrap, { children: c }) : c
}
function OS({ router: a, ...o }) {
  return _.jsx(MS, { router: a, ...o, children: _.jsx(RS, {}) })
}
var Cc = { exports: {} },
  Di = {},
  Ac = { exports: {} },
  Mc = {}
var jp
function wS() {
  return (
    jp ||
      ((jp = 1),
      (function (a) {
        function o(j, J) {
          var Z = j.length
          j.push(J)
          t: for (; 0 < Z; ) {
            var xt = (Z - 1) >>> 1,
              Rt = j[xt]
            if (0 < c(Rt, J)) ((j[xt] = J), (j[Z] = Rt), (Z = xt))
            else break t
          }
        }
        function i(j) {
          return j.length === 0 ? null : j[0]
        }
        function s(j) {
          if (j.length === 0) return null
          var J = j[0],
            Z = j.pop()
          if (Z !== J) {
            j[0] = Z
            t: for (var xt = 0, Rt = j.length, C = Rt >>> 1; xt < C; ) {
              var q = 2 * (xt + 1) - 1,
                P = j[q],
                F = q + 1,
                it = j[F]
              if (0 > c(P, Z))
                F < Rt && 0 > c(it, P)
                  ? ((j[xt] = it), (j[F] = Z), (xt = F))
                  : ((j[xt] = P), (j[q] = Z), (xt = q))
              else if (F < Rt && 0 > c(it, Z))
                ((j[xt] = it), (j[F] = Z), (xt = F))
              else break t
            }
          }
          return J
        }
        function c(j, J) {
          var Z = j.sortIndex - J.sortIndex
          return Z !== 0 ? Z : j.id - J.id
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == 'object' &&
            typeof performance.now == 'function')
        ) {
          var f = performance
          a.unstable_now = function () {
            return f.now()
          }
        } else {
          var m = Date,
            h = m.now()
          a.unstable_now = function () {
            return m.now() - h
          }
        }
        var p = [],
          v = [],
          b = 1,
          g = null,
          S = 3,
          T = !1,
          N = !1,
          M = !1,
          O = !1,
          U = typeof setTimeout == 'function' ? setTimeout : null,
          Q = typeof clearTimeout == 'function' ? clearTimeout : null,
          K = typeof setImmediate < 'u' ? setImmediate : null
        function X(j) {
          for (var J = i(v); J !== null; ) {
            if (J.callback === null) s(v)
            else if (J.startTime <= j)
              (s(v), (J.sortIndex = J.expirationTime), o(p, J))
            else break
            J = i(v)
          }
        }
        function W(j) {
          if (((M = !1), X(j), !N))
            if (i(p) !== null) ((N = !0), G || ((G = !0), vt()))
            else {
              var J = i(v)
              J !== null && At(W, J.startTime - j)
            }
        }
        var G = !1,
          Y = -1,
          B = 5,
          $ = -1
        function ut() {
          return O ? !0 : !(a.unstable_now() - $ < B)
        }
        function st() {
          if (((O = !1), G)) {
            var j = a.unstable_now()
            $ = j
            var J = !0
            try {
              t: {
                ;((N = !1), M && ((M = !1), Q(Y), (Y = -1)), (T = !0))
                var Z = S
                try {
                  e: {
                    for (
                      X(j), g = i(p);
                      g !== null && !(g.expirationTime > j && ut());
                    ) {
                      var xt = g.callback
                      if (typeof xt == 'function') {
                        ;((g.callback = null), (S = g.priorityLevel))
                        var Rt = xt(g.expirationTime <= j)
                        if (((j = a.unstable_now()), typeof Rt == 'function')) {
                          ;((g.callback = Rt), X(j), (J = !0))
                          break e
                        }
                        ;(g === i(p) && s(p), X(j))
                      } else s(p)
                      g = i(p)
                    }
                    if (g !== null) J = !0
                    else {
                      var C = i(v)
                      ;(C !== null && At(W, C.startTime - j), (J = !1))
                    }
                  }
                  break t
                } finally {
                  ;((g = null), (S = Z), (T = !1))
                }
                J = void 0
              }
            } finally {
              J ? vt() : (G = !1)
            }
          }
        }
        var vt
        if (typeof K == 'function')
          vt = function () {
            K(st)
          }
        else if (typeof MessageChannel < 'u') {
          var Ht = new MessageChannel(),
            jt = Ht.port2
          ;((Ht.port1.onmessage = st),
            (vt = function () {
              jt.postMessage(null)
            }))
        } else
          vt = function () {
            U(st, 0)
          }
        function At(j, J) {
          Y = U(function () {
            j(a.unstable_now())
          }, J)
        }
        ;((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (j) {
            j.callback = null
          }),
          (a.unstable_forceFrameRate = function (j) {
            0 > j || 125 < j
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported',
                )
              : (B = 0 < j ? Math.floor(1e3 / j) : 5)
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return S
          }),
          (a.unstable_next = function (j) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var J = 3
                break
              default:
                J = S
            }
            var Z = S
            S = J
            try {
              return j()
            } finally {
              S = Z
            }
          }),
          (a.unstable_requestPaint = function () {
            O = !0
          }),
          (a.unstable_runWithPriority = function (j, J) {
            switch (j) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break
              default:
                j = 3
            }
            var Z = S
            S = j
            try {
              return J()
            } finally {
              S = Z
            }
          }),
          (a.unstable_scheduleCallback = function (j, J, Z) {
            var xt = a.unstable_now()
            switch (
              (typeof Z == 'object' && Z !== null
                ? ((Z = Z.delay),
                  (Z = typeof Z == 'number' && 0 < Z ? xt + Z : xt))
                : (Z = xt),
              j)
            ) {
              case 1:
                var Rt = -1
                break
              case 2:
                Rt = 250
                break
              case 5:
                Rt = 1073741823
                break
              case 4:
                Rt = 1e4
                break
              default:
                Rt = 5e3
            }
            return (
              (Rt = Z + Rt),
              (j = {
                id: b++,
                callback: J,
                priorityLevel: j,
                startTime: Z,
                expirationTime: Rt,
                sortIndex: -1,
              }),
              Z > xt
                ? ((j.sortIndex = Z),
                  o(v, j),
                  i(p) === null &&
                    j === i(v) &&
                    (M ? (Q(Y), (Y = -1)) : (M = !0), At(W, Z - xt)))
                : ((j.sortIndex = Rt),
                  o(p, j),
                  N || T || ((N = !0), G || ((G = !0), vt()))),
              j
            )
          }),
          (a.unstable_shouldYield = ut),
          (a.unstable_wrapCallback = function (j) {
            var J = S
            return function () {
              var Z = S
              S = J
              try {
                return j.apply(this, arguments)
              } finally {
                S = Z
              }
            }
          }))
      })(Mc)),
    Mc
  )
}
var Up
function zS() {
  return (Up || ((Up = 1), (Ac.exports = wS())), Ac.exports)
}
var Bp
function DS() {
  if (Bp) return Di
  Bp = 1
  var a = zS(),
    o = Vi(),
    i = _v()
  function s(t) {
    var e = 'https://react.dev/errors/' + t
    if (1 < arguments.length) {
      e += '?args[]=' + encodeURIComponent(arguments[1])
      for (var n = 2; n < arguments.length; n++)
        e += '&args[]=' + encodeURIComponent(arguments[n])
    }
    return (
      'Minified React error #' +
      t +
      '; visit ' +
      e +
      ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
    )
  }
  function c(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
  }
  function f(t) {
    var e = t,
      n = t
    if (t.alternate) for (; e.return; ) e = e.return
    else {
      t = e
      do ((e = t), (e.flags & 4098) !== 0 && (n = e.return), (t = e.return))
      while (t)
    }
    return e.tag === 3 ? n : null
  }
  function m(t) {
    if (t.tag === 13) {
      var e = t.memoizedState
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated
    }
    return null
  }
  function h(t) {
    if (t.tag === 31) {
      var e = t.memoizedState
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated
    }
    return null
  }
  function p(t) {
    if (f(t) !== t) throw Error(s(188))
  }
  function v(t) {
    var e = t.alternate
    if (!e) {
      if (((e = f(t)), e === null)) throw Error(s(188))
      return e !== t ? null : t
    }
    for (var n = t, l = e; ; ) {
      var r = n.return
      if (r === null) break
      var u = r.alternate
      if (u === null) {
        if (((l = r.return), l !== null)) {
          n = l
          continue
        }
        break
      }
      if (r.child === u.child) {
        for (u = r.child; u; ) {
          if (u === n) return (p(r), t)
          if (u === l) return (p(r), e)
          u = u.sibling
        }
        throw Error(s(188))
      }
      if (n.return !== l.return) ((n = r), (l = u))
      else {
        for (var d = !1, y = r.child; y; ) {
          if (y === n) {
            ;((d = !0), (n = r), (l = u))
            break
          }
          if (y === l) {
            ;((d = !0), (l = r), (n = u))
            break
          }
          y = y.sibling
        }
        if (!d) {
          for (y = u.child; y; ) {
            if (y === n) {
              ;((d = !0), (n = u), (l = r))
              break
            }
            if (y === l) {
              ;((d = !0), (l = u), (n = r))
              break
            }
            y = y.sibling
          }
          if (!d) throw Error(s(189))
        }
      }
      if (n.alternate !== l) throw Error(s(190))
    }
    if (n.tag !== 3) throw Error(s(188))
    return n.stateNode.current === n ? t : e
  }
  function b(t) {
    var e = t.tag
    if (e === 5 || e === 26 || e === 27 || e === 6) return t
    for (t = t.child; t !== null; ) {
      if (((e = b(t)), e !== null)) return e
      t = t.sibling
    }
    return null
  }
  var g = Object.assign,
    S = Symbol.for('react.element'),
    T = Symbol.for('react.transitional.element'),
    N = Symbol.for('react.portal'),
    M = Symbol.for('react.fragment'),
    O = Symbol.for('react.strict_mode'),
    U = Symbol.for('react.profiler'),
    Q = Symbol.for('react.consumer'),
    K = Symbol.for('react.context'),
    X = Symbol.for('react.forward_ref'),
    W = Symbol.for('react.suspense'),
    G = Symbol.for('react.suspense_list'),
    Y = Symbol.for('react.memo'),
    B = Symbol.for('react.lazy'),
    $ = Symbol.for('react.activity'),
    ut = Symbol.for('react.memo_cache_sentinel'),
    st = Symbol.iterator
  function vt(t) {
    return t === null || typeof t != 'object'
      ? null
      : ((t = (st && t[st]) || t['@@iterator']),
        typeof t == 'function' ? t : null)
  }
  var Ht = Symbol.for('react.client.reference')
  function jt(t) {
    if (t == null) return null
    if (typeof t == 'function')
      return t.$$typeof === Ht ? null : t.displayName || t.name || null
    if (typeof t == 'string') return t
    switch (t) {
      case M:
        return 'Fragment'
      case U:
        return 'Profiler'
      case O:
        return 'StrictMode'
      case W:
        return 'Suspense'
      case G:
        return 'SuspenseList'
      case $:
        return 'Activity'
    }
    if (typeof t == 'object')
      switch (t.$$typeof) {
        case N:
          return 'Portal'
        case K:
          return t.displayName || 'Context'
        case Q:
          return (t._context.displayName || 'Context') + '.Consumer'
        case X:
          var e = t.render
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ''),
              (t = t !== '' ? 'ForwardRef(' + t + ')' : 'ForwardRef')),
            t
          )
        case Y:
          return (
            (e = t.displayName || null),
            e !== null ? e : jt(t.type) || 'Memo'
          )
        case B:
          ;((e = t._payload), (t = t._init))
          try {
            return jt(t(e))
          } catch {}
      }
    return null
  }
  var At = Array.isArray,
    j = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    J = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = { pending: !1, data: null, method: null, action: null },
    xt = [],
    Rt = -1
  function C(t) {
    return { current: t }
  }
  function q(t) {
    0 > Rt || ((t.current = xt[Rt]), (xt[Rt] = null), Rt--)
  }
  function P(t, e) {
    ;(Rt++, (xt[Rt] = t.current), (t.current = e))
  }
  var F = C(null),
    it = C(null),
    rt = C(null),
    lt = C(null)
  function qt(t, e) {
    switch ((P(rt, e), P(it, t), P(F, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Nm(t) : 0
        break
      default:
        if (((t = e.tagName), (e = e.namespaceURI)))
          ((e = Nm(e)), (t = Lm(e, t)))
        else
          switch (t) {
            case 'svg':
              t = 1
              break
            case 'math':
              t = 2
              break
            default:
              t = 0
          }
    }
    ;(q(F), P(F, t))
  }
  function St() {
    ;(q(F), q(it), q(rt))
  }
  function re(t) {
    t.memoizedState !== null && P(lt, t)
    var e = F.current,
      n = Lm(e, t.type)
    e !== n && (P(it, t), P(F, n))
  }
  function Me(t) {
    ;(it.current === t && (q(F), q(it)),
      lt.current === t && (q(lt), (Ri._currentValue = Z)))
  }
  var le, Zi
  function Ie(t) {
    if (le === void 0)
      try {
        throw Error()
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/)
        ;((le = (e && e[1]) || ''),
          (Zi =
            -1 <
            n.stack.indexOf(`
    at`)
              ? ' (<anonymous>)'
              : -1 < n.stack.indexOf('@')
                ? '@unknown:0:0'
                : ''))
      }
    return (
      `
` +
      le +
      t +
      Zi
    )
  }
  var wa = !1
  function Ll(t, e) {
    if (!t || wa) return ''
    wa = !0
    var n = Error.prepareStackTrace
    Error.prepareStackTrace = void 0
    try {
      var l = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var V = function () {
                throw Error()
              }
              if (
                (Object.defineProperty(V.prototype, 'props', {
                  set: function () {
                    throw Error()
                  },
                }),
                typeof Reflect == 'object' && Reflect.construct)
              ) {
                try {
                  Reflect.construct(V, [])
                } catch (L) {
                  var D = L
                }
                Reflect.construct(t, [], V)
              } else {
                try {
                  V.call()
                } catch (L) {
                  D = L
                }
                t.call(V.prototype)
              }
            } else {
              try {
                throw Error()
              } catch (L) {
                D = L
              }
              ;(V = t()) &&
                typeof V.catch == 'function' &&
                V.catch(function () {})
            }
          } catch (L) {
            if (L && D && typeof L.stack == 'string') return [L.stack, D.stack]
          }
          return [null, null]
        },
      }
      l.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot'
      var r = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        'name',
      )
      r &&
        r.configurable &&
        Object.defineProperty(l.DetermineComponentFrameRoot, 'name', {
          value: 'DetermineComponentFrameRoot',
        })
      var u = l.DetermineComponentFrameRoot(),
        d = u[0],
        y = u[1]
      if (d && y) {
        var E = d.split(`
`),
          z = y.split(`
`)
        for (
          r = l = 0;
          l < E.length && !E[l].includes('DetermineComponentFrameRoot');
        )
          l++
        for (; r < z.length && !z[r].includes('DetermineComponentFrameRoot'); )
          r++
        if (l === E.length || r === z.length)
          for (
            l = E.length - 1, r = z.length - 1;
            1 <= l && 0 <= r && E[l] !== z[r];
          )
            r--
        for (; 1 <= l && 0 <= r; l--, r--)
          if (E[l] !== z[r]) {
            if (l !== 1 || r !== 1)
              do
                if ((l--, r--, 0 > r || E[l] !== z[r])) {
                  var H =
                    `
` + E[l].replace(' at new ', ' at ')
                  return (
                    t.displayName &&
                      H.includes('<anonymous>') &&
                      (H = H.replace('<anonymous>', t.displayName)),
                    H
                  )
                }
              while (1 <= l && 0 <= r)
            break
          }
      }
    } finally {
      ;((wa = !1), (Error.prepareStackTrace = n))
    }
    return (n = t ? t.displayName || t.name : '') ? Ie(n) : ''
  }
  function Wr(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ie(t.type)
      case 16:
        return Ie('Lazy')
      case 13:
        return t.child !== e && e !== null
          ? Ie('Suspense Fallback')
          : Ie('Suspense')
      case 19:
        return Ie('SuspenseList')
      case 0:
      case 15:
        return Ll(t.type, !1)
      case 11:
        return Ll(t.type.render, !1)
      case 1:
        return Ll(t.type, !0)
      case 31:
        return Ie('Activity')
      default:
        return ''
    }
  }
  function Ki(t) {
    try {
      var e = '',
        n = null
      do ((e += Wr(t, n)), (n = t), (t = t.return))
      while (t)
      return e
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      )
    }
  }
  var En = Object.prototype.hasOwnProperty,
    _n = a.unstable_scheduleCallback,
    za = a.unstable_cancelCallback,
    Pi = a.unstable_shouldYield,
    wt = a.unstable_requestPaint,
    Tt = a.unstable_now,
    ve = a.unstable_getCurrentPriorityLevel,
    jl = a.unstable_ImmediatePriority,
    df = a.unstable_UserBlockingPriority,
    Ji = a.unstable_NormalPriority,
    Rg = a.unstable_LowPriority,
    hf = a.unstable_IdlePriority,
    Tg = a.log,
    Cg = a.unstable_setDisableYieldValue,
    Ul = null,
    ge = null
  function Rn(t) {
    if (
      (typeof Tg == 'function' && Cg(t),
      ge && typeof ge.setStrictMode == 'function')
    )
      try {
        ge.setStrictMode(Ul, t)
      } catch {}
  }
  var ye = Math.clz32 ? Math.clz32 : Og,
    Ag = Math.log,
    Mg = Math.LN2
  function Og(t) {
    return ((t >>>= 0), t === 0 ? 32 : (31 - ((Ag(t) / Mg) | 0)) | 0)
  }
  var Fi = 256,
    Wi = 262144,
    $i = 4194304
  function na(t) {
    var e = t & 42
    if (e !== 0) return e
    switch (t & -t) {
      case 1:
        return 1
      case 2:
        return 2
      case 4:
        return 4
      case 8:
        return 8
      case 16:
        return 16
      case 32:
        return 32
      case 64:
        return 64
      case 128:
        return 128
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560
      case 67108864:
        return 67108864
      case 134217728:
        return 134217728
      case 268435456:
        return 268435456
      case 536870912:
        return 536870912
      case 1073741824:
        return 0
      default:
        return t
    }
  }
  function Ii(t, e, n) {
    var l = t.pendingLanes
    if (l === 0) return 0
    var r = 0,
      u = t.suspendedLanes,
      d = t.pingedLanes
    t = t.warmLanes
    var y = l & 134217727
    return (
      y !== 0
        ? ((l = y & ~u),
          l !== 0
            ? (r = na(l))
            : ((d &= y),
              d !== 0
                ? (r = na(d))
                : n || ((n = y & ~t), n !== 0 && (r = na(n)))))
        : ((y = l & ~u),
          y !== 0
            ? (r = na(y))
            : d !== 0
              ? (r = na(d))
              : n || ((n = l & ~t), n !== 0 && (r = na(n)))),
      r === 0
        ? 0
        : e !== 0 &&
            e !== r &&
            (e & u) === 0 &&
            ((u = r & -r),
            (n = e & -e),
            u >= n || (u === 32 && (n & 4194048) !== 0))
          ? e
          : r
    )
  }
  function Bl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0
  }
  function wg(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1
      default:
        return -1
    }
  }
  function mf() {
    var t = $i
    return (($i <<= 1), ($i & 62914560) === 0 && ($i = 4194304), t)
  }
  function $r(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t)
    return e
  }
  function Hl(t, e) {
    ;((t.pendingLanes |= e),
      e !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0)))
  }
  function zg(t, e, n, l, r, u) {
    var d = t.pendingLanes
    ;((t.pendingLanes = n),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= n),
      (t.entangledLanes &= n),
      (t.errorRecoveryDisabledLanes &= n),
      (t.shellSuspendCounter = 0))
    var y = t.entanglements,
      E = t.expirationTimes,
      z = t.hiddenUpdates
    for (n = d & ~n; 0 < n; ) {
      var H = 31 - ye(n),
        V = 1 << H
      ;((y[H] = 0), (E[H] = -1))
      var D = z[H]
      if (D !== null)
        for (z[H] = null, H = 0; H < D.length; H++) {
          var L = D[H]
          L !== null && (L.lane &= -536870913)
        }
      n &= ~V
    }
    ;(l !== 0 && pf(t, l, 0),
      u !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(d & ~e)))
  }
  function pf(t, e, n) {
    ;((t.pendingLanes |= e), (t.suspendedLanes &= ~e))
    var l = 31 - ye(e)
    ;((t.entangledLanes |= e),
      (t.entanglements[l] = t.entanglements[l] | 1073741824 | (n & 261930)))
  }
  function vf(t, e) {
    var n = (t.entangledLanes |= e)
    for (t = t.entanglements; n; ) {
      var l = 31 - ye(n),
        r = 1 << l
      ;((r & e) | (t[l] & e) && (t[l] |= e), (n &= ~r))
    }
  }
  function gf(t, e) {
    var n = e & -e
    return (
      (n = (n & 42) !== 0 ? 1 : Ir(n)),
      (n & (t.suspendedLanes | e)) !== 0 ? 0 : n
    )
  }
  function Ir(t) {
    switch (t) {
      case 2:
        t = 1
        break
      case 8:
        t = 4
        break
      case 32:
        t = 16
        break
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128
        break
      case 268435456:
        t = 134217728
        break
      default:
        t = 0
    }
    return t
  }
  function ts(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    )
  }
  function yf() {
    var t = J.p
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : ap(t.type))
  }
  function bf(t, e) {
    var n = J.p
    try {
      return ((J.p = t), e())
    } finally {
      J.p = n
    }
  }
  var Tn = Math.random().toString(36).slice(2),
    It = '__reactFiber$' + Tn,
    se = '__reactProps$' + Tn,
    Da = '__reactContainer$' + Tn,
    es = '__reactEvents$' + Tn,
    Dg = '__reactListeners$' + Tn,
    Ng = '__reactHandles$' + Tn,
    Sf = '__reactResources$' + Tn,
    kl = '__reactMarker$' + Tn
  function ns(t) {
    ;(delete t[It], delete t[se], delete t[es], delete t[Dg], delete t[Ng])
  }
  function Na(t) {
    var e = t[It]
    if (e) return e
    for (var n = t.parentNode; n; ) {
      if ((e = n[Da] || n[It])) {
        if (
          ((n = e.alternate),
          e.child !== null || (n !== null && n.child !== null))
        )
          for (t = Ym(t); t !== null; ) {
            if ((n = t[It])) return n
            t = Ym(t)
          }
        return e
      }
      ;((t = n), (n = t.parentNode))
    }
    return null
  }
  function La(t) {
    if ((t = t[It] || t[Da])) {
      var e = t.tag
      if (
        e === 5 ||
        e === 6 ||
        e === 13 ||
        e === 31 ||
        e === 26 ||
        e === 27 ||
        e === 3
      )
        return t
    }
    return null
  }
  function ql(t) {
    var e = t.tag
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode
    throw Error(s(33))
  }
  function ja(t) {
    var e = t[Sf]
    return (
      e ||
        (e = t[Sf] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      e
    )
  }
  function Wt(t) {
    t[kl] = !0
  }
  var xf = new Set(),
    Ef = {}
  function aa(t, e) {
    ;(Ua(t, e), Ua(t + 'Capture', e))
  }
  function Ua(t, e) {
    for (Ef[t] = e, t = 0; t < e.length; t++) xf.add(e[t])
  }
  var Lg = RegExp(
      '^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$',
    ),
    _f = {},
    Rf = {}
  function jg(t) {
    return En.call(Rf, t)
      ? !0
      : En.call(_f, t)
        ? !1
        : Lg.test(t)
          ? (Rf[t] = !0)
          : ((_f[t] = !0), !1)
  }
  function to(t, e, n) {
    if (jg(e))
      if (n === null) t.removeAttribute(e)
      else {
        switch (typeof n) {
          case 'undefined':
          case 'function':
          case 'symbol':
            t.removeAttribute(e)
            return
          case 'boolean':
            var l = e.toLowerCase().slice(0, 5)
            if (l !== 'data-' && l !== 'aria-') {
              t.removeAttribute(e)
              return
            }
        }
        t.setAttribute(e, '' + n)
      }
  }
  function eo(t, e, n) {
    if (n === null) t.removeAttribute(e)
    else {
      switch (typeof n) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(e)
          return
      }
      t.setAttribute(e, '' + n)
    }
  }
  function tn(t, e, n, l) {
    if (l === null) t.removeAttribute(n)
    else {
      switch (typeof l) {
        case 'undefined':
        case 'function':
        case 'symbol':
        case 'boolean':
          t.removeAttribute(n)
          return
      }
      t.setAttributeNS(e, n, '' + l)
    }
  }
  function Oe(t) {
    switch (typeof t) {
      case 'bigint':
      case 'boolean':
      case 'number':
      case 'string':
      case 'undefined':
        return t
      case 'object':
        return t
      default:
        return ''
    }
  }
  function Tf(t) {
    var e = t.type
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === 'input' &&
      (e === 'checkbox' || e === 'radio')
    )
  }
  function Ug(t, e, n) {
    var l = Object.getOwnPropertyDescriptor(t.constructor.prototype, e)
    if (
      !t.hasOwnProperty(e) &&
      typeof l < 'u' &&
      typeof l.get == 'function' &&
      typeof l.set == 'function'
    ) {
      var r = l.get,
        u = l.set
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return r.call(this)
          },
          set: function (d) {
            ;((n = '' + d), u.call(this, d))
          },
        }),
        Object.defineProperty(t, e, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return n
          },
          setValue: function (d) {
            n = '' + d
          },
          stopTracking: function () {
            ;((t._valueTracker = null), delete t[e])
          },
        }
      )
    }
  }
  function as(t) {
    if (!t._valueTracker) {
      var e = Tf(t) ? 'checked' : 'value'
      t._valueTracker = Ug(t, e, '' + t[e])
    }
  }
  function Cf(t) {
    if (!t) return !1
    var e = t._valueTracker
    if (!e) return !0
    var n = e.getValue(),
      l = ''
    return (
      t && (l = Tf(t) ? (t.checked ? 'true' : 'false') : t.value),
      (t = l),
      t !== n ? (e.setValue(t), !0) : !1
    )
  }
  function no(t) {
    if (
      ((t = t || (typeof document < 'u' ? document : void 0)), typeof t > 'u')
    )
      return null
    try {
      return t.activeElement || t.body
    } catch {
      return t.body
    }
  }
  var Bg = /[\n"\\]/g
  function we(t) {
    return t.replace(Bg, function (e) {
      return '\\' + e.charCodeAt(0).toString(16) + ' '
    })
  }
  function ls(t, e, n, l, r, u, d, y) {
    ;((t.name = ''),
      d != null &&
      typeof d != 'function' &&
      typeof d != 'symbol' &&
      typeof d != 'boolean'
        ? (t.type = d)
        : t.removeAttribute('type'),
      e != null
        ? d === 'number'
          ? ((e === 0 && t.value === '') || t.value != e) &&
            (t.value = '' + Oe(e))
          : t.value !== '' + Oe(e) && (t.value = '' + Oe(e))
        : (d !== 'submit' && d !== 'reset') || t.removeAttribute('value'),
      e != null
        ? is(t, d, Oe(e))
        : n != null
          ? is(t, d, Oe(n))
          : l != null && t.removeAttribute('value'),
      r == null && u != null && (t.defaultChecked = !!u),
      r != null &&
        (t.checked = r && typeof r != 'function' && typeof r != 'symbol'),
      y != null &&
      typeof y != 'function' &&
      typeof y != 'symbol' &&
      typeof y != 'boolean'
        ? (t.name = '' + Oe(y))
        : t.removeAttribute('name'))
  }
  function Af(t, e, n, l, r, u, d, y) {
    if (
      (u != null &&
        typeof u != 'function' &&
        typeof u != 'symbol' &&
        typeof u != 'boolean' &&
        (t.type = u),
      e != null || n != null)
    ) {
      if (!((u !== 'submit' && u !== 'reset') || e != null)) {
        as(t)
        return
      }
      ;((n = n != null ? '' + Oe(n) : ''),
        (e = e != null ? '' + Oe(e) : n),
        y || e === t.value || (t.value = e),
        (t.defaultValue = e))
    }
    ;((l = l ?? r),
      (l = typeof l != 'function' && typeof l != 'symbol' && !!l),
      (t.checked = y ? t.checked : !!l),
      (t.defaultChecked = !!l),
      d != null &&
        typeof d != 'function' &&
        typeof d != 'symbol' &&
        typeof d != 'boolean' &&
        (t.name = d),
      as(t))
  }
  function is(t, e, n) {
    ;(e === 'number' && no(t.ownerDocument) === t) ||
      t.defaultValue === '' + n ||
      (t.defaultValue = '' + n)
  }
  function Ba(t, e, n, l) {
    if (((t = t.options), e)) {
      e = {}
      for (var r = 0; r < n.length; r++) e['$' + n[r]] = !0
      for (n = 0; n < t.length; n++)
        ((r = e.hasOwnProperty('$' + t[n].value)),
          t[n].selected !== r && (t[n].selected = r),
          r && l && (t[n].defaultSelected = !0))
    } else {
      for (n = '' + Oe(n), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === n) {
          ;((t[r].selected = !0), l && (t[r].defaultSelected = !0))
          return
        }
        e !== null || t[r].disabled || (e = t[r])
      }
      e !== null && (e.selected = !0)
    }
  }
  function Mf(t, e, n) {
    if (
      e != null &&
      ((e = '' + Oe(e)), e !== t.value && (t.value = e), n == null)
    ) {
      t.defaultValue !== e && (t.defaultValue = e)
      return
    }
    t.defaultValue = n != null ? '' + Oe(n) : ''
  }
  function Of(t, e, n, l) {
    if (e == null) {
      if (l != null) {
        if (n != null) throw Error(s(92))
        if (At(l)) {
          if (1 < l.length) throw Error(s(93))
          l = l[0]
        }
        n = l
      }
      ;(n == null && (n = ''), (e = n))
    }
    ;((n = Oe(e)),
      (t.defaultValue = n),
      (l = t.textContent),
      l === n && l !== '' && l !== null && (t.value = l),
      as(t))
  }
  function Ha(t, e) {
    if (e) {
      var n = t.firstChild
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e
        return
      }
    }
    t.textContent = e
  }
  var Hg = new Set(
    'animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp'.split(
      ' ',
    ),
  )
  function wf(t, e, n) {
    var l = e.indexOf('--') === 0
    n == null || typeof n == 'boolean' || n === ''
      ? l
        ? t.setProperty(e, '')
        : e === 'float'
          ? (t.cssFloat = '')
          : (t[e] = '')
      : l
        ? t.setProperty(e, n)
        : typeof n != 'number' || n === 0 || Hg.has(e)
          ? e === 'float'
            ? (t.cssFloat = n)
            : (t[e] = ('' + n).trim())
          : (t[e] = n + 'px')
  }
  function zf(t, e, n) {
    if (e != null && typeof e != 'object') throw Error(s(62))
    if (((t = t.style), n != null)) {
      for (var l in n)
        !n.hasOwnProperty(l) ||
          (e != null && e.hasOwnProperty(l)) ||
          (l.indexOf('--') === 0
            ? t.setProperty(l, '')
            : l === 'float'
              ? (t.cssFloat = '')
              : (t[l] = ''))
      for (var r in e)
        ((l = e[r]), e.hasOwnProperty(r) && n[r] !== l && wf(t, r, l))
    } else for (var u in e) e.hasOwnProperty(u) && wf(t, u, e[u])
  }
  function os(t) {
    if (t.indexOf('-') === -1) return !1
    switch (t) {
      case 'annotation-xml':
      case 'color-profile':
      case 'font-face':
      case 'font-face-src':
      case 'font-face-uri':
      case 'font-face-format':
      case 'font-face-name':
      case 'missing-glyph':
        return !1
      default:
        return !0
    }
  }
  var kg = new Map([
      ['acceptCharset', 'accept-charset'],
      ['htmlFor', 'for'],
      ['httpEquiv', 'http-equiv'],
      ['crossOrigin', 'crossorigin'],
      ['accentHeight', 'accent-height'],
      ['alignmentBaseline', 'alignment-baseline'],
      ['arabicForm', 'arabic-form'],
      ['baselineShift', 'baseline-shift'],
      ['capHeight', 'cap-height'],
      ['clipPath', 'clip-path'],
      ['clipRule', 'clip-rule'],
      ['colorInterpolation', 'color-interpolation'],
      ['colorInterpolationFilters', 'color-interpolation-filters'],
      ['colorProfile', 'color-profile'],
      ['colorRendering', 'color-rendering'],
      ['dominantBaseline', 'dominant-baseline'],
      ['enableBackground', 'enable-background'],
      ['fillOpacity', 'fill-opacity'],
      ['fillRule', 'fill-rule'],
      ['floodColor', 'flood-color'],
      ['floodOpacity', 'flood-opacity'],
      ['fontFamily', 'font-family'],
      ['fontSize', 'font-size'],
      ['fontSizeAdjust', 'font-size-adjust'],
      ['fontStretch', 'font-stretch'],
      ['fontStyle', 'font-style'],
      ['fontVariant', 'font-variant'],
      ['fontWeight', 'font-weight'],
      ['glyphName', 'glyph-name'],
      ['glyphOrientationHorizontal', 'glyph-orientation-horizontal'],
      ['glyphOrientationVertical', 'glyph-orientation-vertical'],
      ['horizAdvX', 'horiz-adv-x'],
      ['horizOriginX', 'horiz-origin-x'],
      ['imageRendering', 'image-rendering'],
      ['letterSpacing', 'letter-spacing'],
      ['lightingColor', 'lighting-color'],
      ['markerEnd', 'marker-end'],
      ['markerMid', 'marker-mid'],
      ['markerStart', 'marker-start'],
      ['overlinePosition', 'overline-position'],
      ['overlineThickness', 'overline-thickness'],
      ['paintOrder', 'paint-order'],
      ['panose-1', 'panose-1'],
      ['pointerEvents', 'pointer-events'],
      ['renderingIntent', 'rendering-intent'],
      ['shapeRendering', 'shape-rendering'],
      ['stopColor', 'stop-color'],
      ['stopOpacity', 'stop-opacity'],
      ['strikethroughPosition', 'strikethrough-position'],
      ['strikethroughThickness', 'strikethrough-thickness'],
      ['strokeDasharray', 'stroke-dasharray'],
      ['strokeDashoffset', 'stroke-dashoffset'],
      ['strokeLinecap', 'stroke-linecap'],
      ['strokeLinejoin', 'stroke-linejoin'],
      ['strokeMiterlimit', 'stroke-miterlimit'],
      ['strokeOpacity', 'stroke-opacity'],
      ['strokeWidth', 'stroke-width'],
      ['textAnchor', 'text-anchor'],
      ['textDecoration', 'text-decoration'],
      ['textRendering', 'text-rendering'],
      ['transformOrigin', 'transform-origin'],
      ['underlinePosition', 'underline-position'],
      ['underlineThickness', 'underline-thickness'],
      ['unicodeBidi', 'unicode-bidi'],
      ['unicodeRange', 'unicode-range'],
      ['unitsPerEm', 'units-per-em'],
      ['vAlphabetic', 'v-alphabetic'],
      ['vHanging', 'v-hanging'],
      ['vIdeographic', 'v-ideographic'],
      ['vMathematical', 'v-mathematical'],
      ['vectorEffect', 'vector-effect'],
      ['vertAdvY', 'vert-adv-y'],
      ['vertOriginX', 'vert-origin-x'],
      ['vertOriginY', 'vert-origin-y'],
      ['wordSpacing', 'word-spacing'],
      ['writingMode', 'writing-mode'],
      ['xmlnsXlink', 'xmlns:xlink'],
      ['xHeight', 'x-height'],
    ]),
    qg =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i
  function ao(t) {
    return qg.test('' + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t
  }
  function en() {}
  var rs = null
  function ss(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    )
  }
  var ka = null,
    qa = null
  function Df(t) {
    var e = La(t)
    if (e && (t = e.stateNode)) {
      var n = t[se] || null
      t: switch (((t = e.stateNode), e.type)) {
        case 'input':
          if (
            (ls(
              t,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name,
            ),
            (e = n.name),
            n.type === 'radio' && e != null)
          ) {
            for (n = t; n.parentNode; ) n = n.parentNode
            for (
              n = n.querySelectorAll(
                'input[name="' + we('' + e) + '"][type="radio"]',
              ),
                e = 0;
              e < n.length;
              e++
            ) {
              var l = n[e]
              if (l !== t && l.form === t.form) {
                var r = l[se] || null
                if (!r) throw Error(s(90))
                ls(
                  l,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name,
                )
              }
            }
            for (e = 0; e < n.length; e++)
              ((l = n[e]), l.form === t.form && Cf(l))
          }
          break t
        case 'textarea':
          Mf(t, n.value, n.defaultValue)
          break t
        case 'select':
          ;((e = n.value), e != null && Ba(t, !!n.multiple, e, !1))
      }
    }
  }
  var us = !1
  function Nf(t, e, n) {
    if (us) return t(e, n)
    us = !0
    try {
      var l = t(e)
      return l
    } finally {
      if (
        ((us = !1),
        (ka !== null || qa !== null) &&
          (Qo(), ka && ((e = ka), (t = qa), (qa = ka = null), Df(e), t)))
      )
        for (e = 0; e < t.length; e++) Df(t[e])
    }
  }
  function Yl(t, e) {
    var n = t.stateNode
    if (n === null) return null
    var l = n[se] || null
    if (l === null) return null
    n = l[e]
    t: switch (e) {
      case 'onClick':
      case 'onClickCapture':
      case 'onDoubleClick':
      case 'onDoubleClickCapture':
      case 'onMouseDown':
      case 'onMouseDownCapture':
      case 'onMouseMove':
      case 'onMouseMoveCapture':
      case 'onMouseUp':
      case 'onMouseUpCapture':
      case 'onMouseEnter':
        ;((l = !l.disabled) ||
          ((t = t.type),
          (l = !(
            t === 'button' ||
            t === 'input' ||
            t === 'select' ||
            t === 'textarea'
          ))),
          (t = !l))
        break t
      default:
        t = !1
    }
    if (t) return null
    if (n && typeof n != 'function') throw Error(s(231, e, typeof n))
    return n
  }
  var nn = !(
      typeof window > 'u' ||
      typeof window.document > 'u' ||
      typeof window.document.createElement > 'u'
    ),
    cs = !1
  if (nn)
    try {
      var Gl = {}
      ;(Object.defineProperty(Gl, 'passive', {
        get: function () {
          cs = !0
        },
      }),
        window.addEventListener('test', Gl, Gl),
        window.removeEventListener('test', Gl, Gl))
    } catch {
      cs = !1
    }
  var Cn = null,
    fs = null,
    lo = null
  function Lf() {
    if (lo) return lo
    var t,
      e = fs,
      n = e.length,
      l,
      r = 'value' in Cn ? Cn.value : Cn.textContent,
      u = r.length
    for (t = 0; t < n && e[t] === r[t]; t++);
    var d = n - t
    for (l = 1; l <= d && e[n - l] === r[u - l]; l++);
    return (lo = r.slice(t, 1 < l ? 1 - l : void 0))
  }
  function io(t) {
    var e = t.keyCode
    return (
      'charCode' in t
        ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
        : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    )
  }
  function oo() {
    return !0
  }
  function jf() {
    return !1
  }
  function ue(t) {
    function e(n, l, r, u, d) {
      ;((this._reactName = n),
        (this._targetInst = r),
        (this.type = l),
        (this.nativeEvent = u),
        (this.target = d),
        (this.currentTarget = null))
      for (var y in t)
        t.hasOwnProperty(y) && ((n = t[y]), (this[y] = n ? n(u) : u[y]))
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? oo
          : jf),
        (this.isPropagationStopped = jf),
        this
      )
    }
    return (
      g(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0
          var n = this.nativeEvent
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != 'unknown' && (n.returnValue = !1),
            (this.isDefaultPrevented = oo))
        },
        stopPropagation: function () {
          var n = this.nativeEvent
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != 'unknown' && (n.cancelBubble = !0),
            (this.isPropagationStopped = oo))
        },
        persist: function () {},
        isPersistent: oo,
      }),
      e
    )
  }
  var la = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now()
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    ro = ue(la),
    Vl = g({}, la, { view: 0, detail: 0 }),
    Yg = ue(Vl),
    ds,
    hs,
    Xl,
    so = g({}, Vl, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: ps,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget
      },
      movementX: function (t) {
        return 'movementX' in t
          ? t.movementX
          : (t !== Xl &&
              (Xl && t.type === 'mousemove'
                ? ((ds = t.screenX - Xl.screenX), (hs = t.screenY - Xl.screenY))
                : (hs = ds = 0),
              (Xl = t)),
            ds)
      },
      movementY: function (t) {
        return 'movementY' in t ? t.movementY : hs
      },
    }),
    Uf = ue(so),
    Gg = g({}, so, { dataTransfer: 0 }),
    Vg = ue(Gg),
    Xg = g({}, Vl, { relatedTarget: 0 }),
    ms = ue(Xg),
    Qg = g({}, la, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Zg = ue(Qg),
    Kg = g({}, la, {
      clipboardData: function (t) {
        return 'clipboardData' in t ? t.clipboardData : window.clipboardData
      },
    }),
    Pg = ue(Kg),
    Jg = g({}, la, { data: 0 }),
    Bf = ue(Jg),
    Fg = {
      Esc: 'Escape',
      Spacebar: ' ',
      Left: 'ArrowLeft',
      Up: 'ArrowUp',
      Right: 'ArrowRight',
      Down: 'ArrowDown',
      Del: 'Delete',
      Win: 'OS',
      Menu: 'ContextMenu',
      Apps: 'ContextMenu',
      Scroll: 'ScrollLock',
      MozPrintableKey: 'Unidentified',
    },
    Wg = {
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      45: 'Insert',
      46: 'Delete',
      112: 'F1',
      113: 'F2',
      114: 'F3',
      115: 'F4',
      116: 'F5',
      117: 'F6',
      118: 'F7',
      119: 'F8',
      120: 'F9',
      121: 'F10',
      122: 'F11',
      123: 'F12',
      144: 'NumLock',
      145: 'ScrollLock',
      224: 'Meta',
    },
    $g = {
      Alt: 'altKey',
      Control: 'ctrlKey',
      Meta: 'metaKey',
      Shift: 'shiftKey',
    }
  function Ig(t) {
    var e = this.nativeEvent
    return e.getModifierState
      ? e.getModifierState(t)
      : (t = $g[t])
        ? !!e[t]
        : !1
  }
  function ps() {
    return Ig
  }
  var ty = g({}, Vl, {
      key: function (t) {
        if (t.key) {
          var e = Fg[t.key] || t.key
          if (e !== 'Unidentified') return e
        }
        return t.type === 'keypress'
          ? ((t = io(t)), t === 13 ? 'Enter' : String.fromCharCode(t))
          : t.type === 'keydown' || t.type === 'keyup'
            ? Wg[t.keyCode] || 'Unidentified'
            : ''
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: ps,
      charCode: function (t) {
        return t.type === 'keypress' ? io(t) : 0
      },
      keyCode: function (t) {
        return t.type === 'keydown' || t.type === 'keyup' ? t.keyCode : 0
      },
      which: function (t) {
        return t.type === 'keypress'
          ? io(t)
          : t.type === 'keydown' || t.type === 'keyup'
            ? t.keyCode
            : 0
      },
    }),
    ey = ue(ty),
    ny = g({}, so, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Hf = ue(ny),
    ay = g({}, Vl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: ps,
    }),
    ly = ue(ay),
    iy = g({}, la, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    oy = ue(iy),
    ry = g({}, so, {
      deltaX: function (t) {
        return 'deltaX' in t
          ? t.deltaX
          : 'wheelDeltaX' in t
            ? -t.wheelDeltaX
            : 0
      },
      deltaY: function (t) {
        return 'deltaY' in t
          ? t.deltaY
          : 'wheelDeltaY' in t
            ? -t.wheelDeltaY
            : 'wheelDelta' in t
              ? -t.wheelDelta
              : 0
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    sy = ue(ry),
    uy = g({}, la, { newState: 0, oldState: 0 }),
    cy = ue(uy),
    fy = [9, 13, 27, 32],
    vs = nn && 'CompositionEvent' in window,
    Ql = null
  nn && 'documentMode' in document && (Ql = document.documentMode)
  var dy = nn && 'TextEvent' in window && !Ql,
    kf = nn && (!vs || (Ql && 8 < Ql && 11 >= Ql)),
    qf = ' ',
    Yf = !1
  function Gf(t, e) {
    switch (t) {
      case 'keyup':
        return fy.indexOf(e.keyCode) !== -1
      case 'keydown':
        return e.keyCode !== 229
      case 'keypress':
      case 'mousedown':
      case 'focusout':
        return !0
      default:
        return !1
    }
  }
  function Vf(t) {
    return ((t = t.detail), typeof t == 'object' && 'data' in t ? t.data : null)
  }
  var Ya = !1
  function hy(t, e) {
    switch (t) {
      case 'compositionend':
        return Vf(e)
      case 'keypress':
        return e.which !== 32 ? null : ((Yf = !0), qf)
      case 'textInput':
        return ((t = e.data), t === qf && Yf ? null : t)
      default:
        return null
    }
  }
  function my(t, e) {
    if (Ya)
      return t === 'compositionend' || (!vs && Gf(t, e))
        ? ((t = Lf()), (lo = fs = Cn = null), (Ya = !1), t)
        : null
    switch (t) {
      case 'paste':
        return null
      case 'keypress':
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char
          if (e.which) return String.fromCharCode(e.which)
        }
        return null
      case 'compositionend':
        return kf && e.locale !== 'ko' ? null : e.data
      default:
        return null
    }
  }
  var py = {
    color: !0,
    date: !0,
    datetime: !0,
    'datetime-local': !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  }
  function Xf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase()
    return e === 'input' ? !!py[t.type] : e === 'textarea'
  }
  function Qf(t, e, n, l) {
    ;(ka ? (qa ? qa.push(l) : (qa = [l])) : (ka = l),
      (e = $o(e, 'onChange')),
      0 < e.length &&
        ((n = new ro('onChange', 'change', null, n, l)),
        t.push({ event: n, listeners: e })))
  }
  var Zl = null,
    Kl = null
  function vy(t) {
    Am(t, 0)
  }
  function uo(t) {
    var e = ql(t)
    if (Cf(e)) return t
  }
  function Zf(t, e) {
    if (t === 'change') return e
  }
  var Kf = !1
  if (nn) {
    var gs
    if (nn) {
      var ys = 'oninput' in document
      if (!ys) {
        var Pf = document.createElement('div')
        ;(Pf.setAttribute('oninput', 'return;'),
          (ys = typeof Pf.oninput == 'function'))
      }
      gs = ys
    } else gs = !1
    Kf = gs && (!document.documentMode || 9 < document.documentMode)
  }
  function Jf() {
    Zl && (Zl.detachEvent('onpropertychange', Ff), (Kl = Zl = null))
  }
  function Ff(t) {
    if (t.propertyName === 'value' && uo(Kl)) {
      var e = []
      ;(Qf(e, Kl, t, ss(t)), Nf(vy, e))
    }
  }
  function gy(t, e, n) {
    t === 'focusin'
      ? (Jf(), (Zl = e), (Kl = n), Zl.attachEvent('onpropertychange', Ff))
      : t === 'focusout' && Jf()
  }
  function yy(t) {
    if (t === 'selectionchange' || t === 'keyup' || t === 'keydown')
      return uo(Kl)
  }
  function by(t, e) {
    if (t === 'click') return uo(e)
  }
  function Sy(t, e) {
    if (t === 'input' || t === 'change') return uo(e)
  }
  function xy(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e)
  }
  var be = typeof Object.is == 'function' ? Object.is : xy
  function Pl(t, e) {
    if (be(t, e)) return !0
    if (
      typeof t != 'object' ||
      t === null ||
      typeof e != 'object' ||
      e === null
    )
      return !1
    var n = Object.keys(t),
      l = Object.keys(e)
    if (n.length !== l.length) return !1
    for (l = 0; l < n.length; l++) {
      var r = n[l]
      if (!En.call(e, r) || !be(t[r], e[r])) return !1
    }
    return !0
  }
  function Wf(t) {
    for (; t && t.firstChild; ) t = t.firstChild
    return t
  }
  function $f(t, e) {
    var n = Wf(t)
    t = 0
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (((l = t + n.textContent.length), t <= e && l >= e))
          return { node: n, offset: e - t }
        t = l
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling
            break t
          }
          n = n.parentNode
        }
        n = void 0
      }
      n = Wf(n)
    }
  }
  function If(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
          ? !1
          : e && e.nodeType === 3
            ? If(t, e.parentNode)
            : 'contains' in t
              ? t.contains(e)
              : t.compareDocumentPosition
                ? !!(t.compareDocumentPosition(e) & 16)
                : !1
      : !1
  }
  function td(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window
    for (var e = no(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == 'string'
      } catch {
        n = !1
      }
      if (n) t = e.contentWindow
      else break
      e = no(t.document)
    }
    return e
  }
  function bs(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase()
    return (
      e &&
      ((e === 'input' &&
        (t.type === 'text' ||
          t.type === 'search' ||
          t.type === 'tel' ||
          t.type === 'url' ||
          t.type === 'password')) ||
        e === 'textarea' ||
        t.contentEditable === 'true')
    )
  }
  var Ey = nn && 'documentMode' in document && 11 >= document.documentMode,
    Ga = null,
    Ss = null,
    Jl = null,
    xs = !1
  function ed(t, e, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument
    xs ||
      Ga == null ||
      Ga !== no(l) ||
      ((l = Ga),
      'selectionStart' in l && bs(l)
        ? (l = { start: l.selectionStart, end: l.selectionEnd })
        : ((l = (
            (l.ownerDocument && l.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset,
          })),
      (Jl && Pl(Jl, l)) ||
        ((Jl = l),
        (l = $o(Ss, 'onSelect')),
        0 < l.length &&
          ((e = new ro('onSelect', 'select', null, e, n)),
          t.push({ event: e, listeners: l }),
          (e.target = Ga))))
  }
  function ia(t, e) {
    var n = {}
    return (
      (n[t.toLowerCase()] = e.toLowerCase()),
      (n['Webkit' + t] = 'webkit' + e),
      (n['Moz' + t] = 'moz' + e),
      n
    )
  }
  var Va = {
      animationend: ia('Animation', 'AnimationEnd'),
      animationiteration: ia('Animation', 'AnimationIteration'),
      animationstart: ia('Animation', 'AnimationStart'),
      transitionrun: ia('Transition', 'TransitionRun'),
      transitionstart: ia('Transition', 'TransitionStart'),
      transitioncancel: ia('Transition', 'TransitionCancel'),
      transitionend: ia('Transition', 'TransitionEnd'),
    },
    Es = {},
    nd = {}
  nn &&
    ((nd = document.createElement('div').style),
    'AnimationEvent' in window ||
      (delete Va.animationend.animation,
      delete Va.animationiteration.animation,
      delete Va.animationstart.animation),
    'TransitionEvent' in window || delete Va.transitionend.transition)
  function oa(t) {
    if (Es[t]) return Es[t]
    if (!Va[t]) return t
    var e = Va[t],
      n
    for (n in e) if (e.hasOwnProperty(n) && n in nd) return (Es[t] = e[n])
    return t
  }
  var ad = oa('animationend'),
    ld = oa('animationiteration'),
    id = oa('animationstart'),
    _y = oa('transitionrun'),
    Ry = oa('transitionstart'),
    Ty = oa('transitioncancel'),
    od = oa('transitionend'),
    rd = new Map(),
    _s =
      'abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
        ' ',
      )
  _s.push('scrollEnd')
  function Ye(t, e) {
    ;(rd.set(t, e), aa(e, [t]))
  }
  var co =
      typeof reportError == 'function'
        ? reportError
        : function (t) {
            if (
              typeof window == 'object' &&
              typeof window.ErrorEvent == 'function'
            ) {
              var e = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == 'object' &&
                  t !== null &&
                  typeof t.message == 'string'
                    ? String(t.message)
                    : String(t),
                error: t,
              })
              if (!window.dispatchEvent(e)) return
            } else if (
              typeof process == 'object' &&
              typeof process.emit == 'function'
            ) {
              process.emit('uncaughtException', t)
              return
            }
            console.error(t)
          },
    ze = [],
    Xa = 0,
    Rs = 0
  function fo() {
    for (var t = Xa, e = (Rs = Xa = 0); e < t; ) {
      var n = ze[e]
      ze[e++] = null
      var l = ze[e]
      ze[e++] = null
      var r = ze[e]
      ze[e++] = null
      var u = ze[e]
      if (((ze[e++] = null), l !== null && r !== null)) {
        var d = l.pending
        ;(d === null ? (r.next = r) : ((r.next = d.next), (d.next = r)),
          (l.pending = r))
      }
      u !== 0 && sd(n, r, u)
    }
  }
  function ho(t, e, n, l) {
    ;((ze[Xa++] = t),
      (ze[Xa++] = e),
      (ze[Xa++] = n),
      (ze[Xa++] = l),
      (Rs |= l),
      (t.lanes |= l),
      (t = t.alternate),
      t !== null && (t.lanes |= l))
  }
  function Ts(t, e, n, l) {
    return (ho(t, e, n, l), mo(t))
  }
  function ra(t, e) {
    return (ho(t, null, null, e), mo(t))
  }
  function sd(t, e, n) {
    t.lanes |= n
    var l = t.alternate
    l !== null && (l.lanes |= n)
    for (var r = !1, u = t.return; u !== null; )
      ((u.childLanes |= n),
        (l = u.alternate),
        l !== null && (l.childLanes |= n),
        u.tag === 22 &&
          ((t = u.stateNode), t === null || t._visibility & 1 || (r = !0)),
        (t = u),
        (u = u.return))
    return t.tag === 3
      ? ((u = t.stateNode),
        r &&
          e !== null &&
          ((r = 31 - ye(n)),
          (t = u.hiddenUpdates),
          (l = t[r]),
          l === null ? (t[r] = [e]) : l.push(e),
          (e.lane = n | 536870912)),
        u)
      : null
  }
  function mo(t) {
    if (50 < gi) throw ((gi = 0), (Lu = null), Error(s(185)))
    for (var e = t.return; e !== null; ) ((t = e), (e = t.return))
    return t.tag === 3 ? t.stateNode : null
  }
  var Qa = {}
  function Cy(t, e, n, l) {
    ;((this.tag = t),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = l),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null))
  }
  function Se(t, e, n, l) {
    return new Cy(t, e, n, l)
  }
  function Cs(t) {
    return ((t = t.prototype), !(!t || !t.isReactComponent))
  }
  function an(t, e) {
    var n = t.alternate
    return (
      n === null
        ? ((n = Se(t.tag, e, t.key, t.mode)),
          (n.elementType = t.elementType),
          (n.type = t.type),
          (n.stateNode = t.stateNode),
          (n.alternate = t),
          (t.alternate = n))
        : ((n.pendingProps = e),
          (n.type = t.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = t.flags & 65011712),
      (n.childLanes = t.childLanes),
      (n.lanes = t.lanes),
      (n.child = t.child),
      (n.memoizedProps = t.memoizedProps),
      (n.memoizedState = t.memoizedState),
      (n.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (n.dependencies =
        e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (n.sibling = t.sibling),
      (n.index = t.index),
      (n.ref = t.ref),
      (n.refCleanup = t.refCleanup),
      n
    )
  }
  function ud(t, e) {
    t.flags &= 65011714
    var n = t.alternate
    return (
      n === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = n.childLanes),
          (t.lanes = n.lanes),
          (t.child = n.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = n.memoizedProps),
          (t.memoizedState = n.memoizedState),
          (t.updateQueue = n.updateQueue),
          (t.type = n.type),
          (e = n.dependencies),
          (t.dependencies =
            e === null
              ? null
              : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    )
  }
  function po(t, e, n, l, r, u) {
    var d = 0
    if (((l = t), typeof t == 'function')) Cs(t) && (d = 1)
    else if (typeof t == 'string')
      d = z0(t, n, F.current)
        ? 26
        : t === 'html' || t === 'head' || t === 'body'
          ? 27
          : 5
    else
      t: switch (t) {
        case $:
          return ((t = Se(31, n, e, r)), (t.elementType = $), (t.lanes = u), t)
        case M:
          return sa(n.children, r, u, e)
        case O:
          ;((d = 8), (r |= 24))
          break
        case U:
          return (
            (t = Se(12, n, e, r | 2)),
            (t.elementType = U),
            (t.lanes = u),
            t
          )
        case W:
          return ((t = Se(13, n, e, r)), (t.elementType = W), (t.lanes = u), t)
        case G:
          return ((t = Se(19, n, e, r)), (t.elementType = G), (t.lanes = u), t)
        default:
          if (typeof t == 'object' && t !== null)
            switch (t.$$typeof) {
              case K:
                d = 10
                break t
              case Q:
                d = 9
                break t
              case X:
                d = 11
                break t
              case Y:
                d = 14
                break t
              case B:
                ;((d = 16), (l = null))
                break t
            }
          ;((d = 29),
            (n = Error(s(130, t === null ? 'null' : typeof t, ''))),
            (l = null))
      }
    return (
      (e = Se(d, n, e, r)),
      (e.elementType = t),
      (e.type = l),
      (e.lanes = u),
      e
    )
  }
  function sa(t, e, n, l) {
    return ((t = Se(7, t, l, e)), (t.lanes = n), t)
  }
  function As(t, e, n) {
    return ((t = Se(6, t, null, e)), (t.lanes = n), t)
  }
  function cd(t) {
    var e = Se(18, null, null, 0)
    return ((e.stateNode = t), e)
  }
  function Ms(t, e, n) {
    return (
      (e = Se(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = n),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    )
  }
  var fd = new WeakMap()
  function De(t, e) {
    if (typeof t == 'object' && t !== null) {
      var n = fd.get(t)
      return n !== void 0
        ? n
        : ((e = { value: t, source: e, stack: Ki(e) }), fd.set(t, e), e)
    }
    return { value: t, source: e, stack: Ki(e) }
  }
  var Za = [],
    Ka = 0,
    vo = null,
    Fl = 0,
    Ne = [],
    Le = 0,
    An = null,
    Ke = 1,
    Pe = ''
  function ln(t, e) {
    ;((Za[Ka++] = Fl), (Za[Ka++] = vo), (vo = t), (Fl = e))
  }
  function dd(t, e, n) {
    ;((Ne[Le++] = Ke), (Ne[Le++] = Pe), (Ne[Le++] = An), (An = t))
    var l = Ke
    t = Pe
    var r = 32 - ye(l) - 1
    ;((l &= ~(1 << r)), (n += 1))
    var u = 32 - ye(e) + r
    if (30 < u) {
      var d = r - (r % 5)
      ;((u = (l & ((1 << d) - 1)).toString(32)),
        (l >>= d),
        (r -= d),
        (Ke = (1 << (32 - ye(e) + r)) | (n << r) | l),
        (Pe = u + t))
    } else ((Ke = (1 << u) | (n << r) | l), (Pe = t))
  }
  function Os(t) {
    t.return !== null && (ln(t, 1), dd(t, 1, 0))
  }
  function ws(t) {
    for (; t === vo; )
      ((vo = Za[--Ka]), (Za[Ka] = null), (Fl = Za[--Ka]), (Za[Ka] = null))
    for (; t === An; )
      ((An = Ne[--Le]),
        (Ne[Le] = null),
        (Pe = Ne[--Le]),
        (Ne[Le] = null),
        (Ke = Ne[--Le]),
        (Ne[Le] = null))
  }
  function hd(t, e) {
    ;((Ne[Le++] = Ke),
      (Ne[Le++] = Pe),
      (Ne[Le++] = An),
      (Ke = e.id),
      (Pe = e.overflow),
      (An = t))
  }
  var te = null,
    Ut = null,
    bt = !1,
    Mn = null,
    je = !1,
    zs = Error(s(519))
  function On(t) {
    var e = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? 'text'
          : 'HTML',
        '',
      ),
    )
    throw (Wl(De(e, t)), zs)
  }
  function md(t) {
    var e = t.stateNode,
      n = t.type,
      l = t.memoizedProps
    switch (((e[It] = t), (e[se] = l), n)) {
      case 'dialog':
        ;(pt('cancel', e), pt('close', e))
        break
      case 'iframe':
      case 'object':
      case 'embed':
        pt('load', e)
        break
      case 'video':
      case 'audio':
        for (n = 0; n < bi.length; n++) pt(bi[n], e)
        break
      case 'source':
        pt('error', e)
        break
      case 'img':
      case 'image':
      case 'link':
        ;(pt('error', e), pt('load', e))
        break
      case 'details':
        pt('toggle', e)
        break
      case 'input':
        ;(pt('invalid', e),
          Af(
            e,
            l.value,
            l.defaultValue,
            l.checked,
            l.defaultChecked,
            l.type,
            l.name,
            !0,
          ))
        break
      case 'select':
        pt('invalid', e)
        break
      case 'textarea':
        ;(pt('invalid', e), Of(e, l.value, l.defaultValue, l.children))
    }
    ;((n = l.children),
      (typeof n != 'string' && typeof n != 'number' && typeof n != 'bigint') ||
      e.textContent === '' + n ||
      l.suppressHydrationWarning === !0 ||
      zm(e.textContent, n)
        ? (l.popover != null && (pt('beforetoggle', e), pt('toggle', e)),
          l.onScroll != null && pt('scroll', e),
          l.onScrollEnd != null && pt('scrollend', e),
          l.onClick != null && (e.onclick = en),
          (e = !0))
        : (e = !1),
      e || On(t, !0))
  }
  function pd(t) {
    for (te = t.return; te; )
      switch (te.tag) {
        case 5:
        case 31:
        case 13:
          je = !1
          return
        case 27:
        case 3:
          je = !0
          return
        default:
          te = te.return
      }
  }
  function Pa(t) {
    if (t !== te) return !1
    if (!bt) return (pd(t), (bt = !0), !1)
    var e = t.tag,
      n
    if (
      ((n = e !== 3 && e !== 27) &&
        ((n = e === 5) &&
          ((n = t.type),
          (n =
            !(n !== 'form' && n !== 'button') || Ju(t.type, t.memoizedProps))),
        (n = !n)),
      n && Ut && On(t),
      pd(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(s(317))
      Ut = qm(t)
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(s(317))
      Ut = qm(t)
    } else
      e === 27
        ? ((e = Ut), Vn(t.type) ? ((t = tc), (tc = null), (Ut = t)) : (Ut = e))
        : (Ut = te ? Be(t.stateNode.nextSibling) : null)
    return !0
  }
  function ua() {
    ;((Ut = te = null), (bt = !1))
  }
  function Ds() {
    var t = Mn
    return (
      t !== null &&
        (he === null ? (he = t) : he.push.apply(he, t), (Mn = null)),
      t
    )
  }
  function Wl(t) {
    Mn === null ? (Mn = [t]) : Mn.push(t)
  }
  var Ns = C(null),
    ca = null,
    on = null
  function wn(t, e, n) {
    ;(P(Ns, e._currentValue), (e._currentValue = n))
  }
  function rn(t) {
    ;((t._currentValue = Ns.current), q(Ns))
  }
  function Ls(t, e, n) {
    for (; t !== null; ) {
      var l = t.alternate
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), l !== null && (l.childLanes |= e))
          : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e),
        t === n)
      )
        break
      t = t.return
    }
  }
  function js(t, e, n, l) {
    var r = t.child
    for (r !== null && (r.return = t); r !== null; ) {
      var u = r.dependencies
      if (u !== null) {
        var d = r.child
        u = u.firstContext
        t: for (; u !== null; ) {
          var y = u
          u = r
          for (var E = 0; E < e.length; E++)
            if (y.context === e[E]) {
              ;((u.lanes |= n),
                (y = u.alternate),
                y !== null && (y.lanes |= n),
                Ls(u.return, n, t),
                l || (d = null))
              break t
            }
          u = y.next
        }
      } else if (r.tag === 18) {
        if (((d = r.return), d === null)) throw Error(s(341))
        ;((d.lanes |= n),
          (u = d.alternate),
          u !== null && (u.lanes |= n),
          Ls(d, n, t),
          (d = null))
      } else d = r.child
      if (d !== null) d.return = r
      else
        for (d = r; d !== null; ) {
          if (d === t) {
            d = null
            break
          }
          if (((r = d.sibling), r !== null)) {
            ;((r.return = d.return), (d = r))
            break
          }
          d = d.return
        }
      r = d
    }
  }
  function Ja(t, e, n, l) {
    t = null
    for (var r = e, u = !1; r !== null; ) {
      if (!u) {
        if ((r.flags & 524288) !== 0) u = !0
        else if ((r.flags & 262144) !== 0) break
      }
      if (r.tag === 10) {
        var d = r.alternate
        if (d === null) throw Error(s(387))
        if (((d = d.memoizedProps), d !== null)) {
          var y = r.type
          be(r.pendingProps.value, d.value) ||
            (t !== null ? t.push(y) : (t = [y]))
        }
      } else if (r === lt.current) {
        if (((d = r.alternate), d === null)) throw Error(s(387))
        d.memoizedState.memoizedState !== r.memoizedState.memoizedState &&
          (t !== null ? t.push(Ri) : (t = [Ri]))
      }
      r = r.return
    }
    ;(t !== null && js(e, t, n, l), (e.flags |= 262144))
  }
  function go(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!be(t.context._currentValue, t.memoizedValue)) return !0
      t = t.next
    }
    return !1
  }
  function fa(t) {
    ;((ca = t),
      (on = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null))
  }
  function ee(t) {
    return vd(ca, t)
  }
  function yo(t, e) {
    return (ca === null && fa(t), vd(t, e))
  }
  function vd(t, e) {
    var n = e._currentValue
    if (((e = { context: e, memoizedValue: n, next: null }), on === null)) {
      if (t === null) throw Error(s(308))
      ;((on = e),
        (t.dependencies = { lanes: 0, firstContext: e }),
        (t.flags |= 524288))
    } else on = on.next = e
    return n
  }
  var Ay =
      typeof AbortController < 'u'
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (n, l) {
                  t.push(l)
                },
              })
            this.abort = function () {
              ;((e.aborted = !0),
                t.forEach(function (n) {
                  return n()
                }))
            }
          },
    My = a.unstable_scheduleCallback,
    Oy = a.unstable_NormalPriority,
    Qt = {
      $$typeof: K,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    }
  function Us() {
    return { controller: new Ay(), data: new Map(), refCount: 0 }
  }
  function $l(t) {
    ;(t.refCount--,
      t.refCount === 0 &&
        My(Oy, function () {
          t.controller.abort()
        }))
  }
  var Il = null,
    Bs = 0,
    Fa = 0,
    Wa = null
  function wy(t, e) {
    if (Il === null) {
      var n = (Il = [])
      ;((Bs = 0),
        (Fa = qu()),
        (Wa = {
          status: 'pending',
          value: void 0,
          then: function (l) {
            n.push(l)
          },
        }))
    }
    return (Bs++, e.then(gd, gd), e)
  }
  function gd() {
    if (--Bs === 0 && Il !== null) {
      Wa !== null && (Wa.status = 'fulfilled')
      var t = Il
      ;((Il = null), (Fa = 0), (Wa = null))
      for (var e = 0; e < t.length; e++) (0, t[e])()
    }
  }
  function zy(t, e) {
    var n = [],
      l = {
        status: 'pending',
        value: null,
        reason: null,
        then: function (r) {
          n.push(r)
        },
      }
    return (
      t.then(
        function () {
          ;((l.status = 'fulfilled'), (l.value = e))
          for (var r = 0; r < n.length; r++) (0, n[r])(e)
        },
        function (r) {
          for (l.status = 'rejected', l.reason = r, r = 0; r < n.length; r++)
            (0, n[r])(void 0)
        },
      ),
      l
    )
  }
  var yd = j.S
  j.S = function (t, e) {
    ;((em = Tt()),
      typeof e == 'object' &&
        e !== null &&
        typeof e.then == 'function' &&
        wy(t, e),
      yd !== null && yd(t, e))
  }
  var da = C(null)
  function Hs() {
    var t = da.current
    return t !== null ? t : Lt.pooledCache
  }
  function bo(t, e) {
    e === null ? P(da, da.current) : P(da, e.pool)
  }
  function bd() {
    var t = Hs()
    return t === null ? null : { parent: Qt._currentValue, pool: t }
  }
  var $a = Error(s(460)),
    ks = Error(s(474)),
    So = Error(s(542)),
    xo = { then: function () {} }
  function Sd(t) {
    return ((t = t.status), t === 'fulfilled' || t === 'rejected')
  }
  function xd(t, e, n) {
    switch (
      ((n = t[n]),
      n === void 0 ? t.push(e) : n !== e && (e.then(en, en), (e = n)),
      e.status)
    ) {
      case 'fulfilled':
        return e.value
      case 'rejected':
        throw ((t = e.reason), _d(t), t)
      default:
        if (typeof e.status == 'string') e.then(en, en)
        else {
          if (((t = Lt), t !== null && 100 < t.shellSuspendCounter))
            throw Error(s(482))
          ;((t = e),
            (t.status = 'pending'),
            t.then(
              function (l) {
                if (e.status === 'pending') {
                  var r = e
                  ;((r.status = 'fulfilled'), (r.value = l))
                }
              },
              function (l) {
                if (e.status === 'pending') {
                  var r = e
                  ;((r.status = 'rejected'), (r.reason = l))
                }
              },
            ))
        }
        switch (e.status) {
          case 'fulfilled':
            return e.value
          case 'rejected':
            throw ((t = e.reason), _d(t), t)
        }
        throw ((ma = e), $a)
    }
  }
  function ha(t) {
    try {
      var e = t._init
      return e(t._payload)
    } catch (n) {
      throw n !== null && typeof n == 'object' && typeof n.then == 'function'
        ? ((ma = n), $a)
        : n
    }
  }
  var ma = null
  function Ed() {
    if (ma === null) throw Error(s(459))
    var t = ma
    return ((ma = null), t)
  }
  function _d(t) {
    if (t === $a || t === So) throw Error(s(483))
  }
  var Ia = null,
    ti = 0
  function Eo(t) {
    var e = ti
    return ((ti += 1), Ia === null && (Ia = []), xd(Ia, t, e))
  }
  function ei(t, e) {
    ;((e = e.props.ref), (t.ref = e !== void 0 ? e : null))
  }
  function _o(t, e) {
    throw e.$$typeof === S
      ? Error(s(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          s(
            31,
            t === '[object Object]'
              ? 'object with keys {' + Object.keys(e).join(', ') + '}'
              : t,
          ),
        ))
  }
  function Rd(t) {
    function e(A, R) {
      if (t) {
        var w = A.deletions
        w === null ? ((A.deletions = [R]), (A.flags |= 16)) : w.push(R)
      }
    }
    function n(A, R) {
      if (!t) return null
      for (; R !== null; ) (e(A, R), (R = R.sibling))
      return null
    }
    function l(A) {
      for (var R = new Map(); A !== null; )
        (A.key !== null ? R.set(A.key, A) : R.set(A.index, A), (A = A.sibling))
      return R
    }
    function r(A, R) {
      return ((A = an(A, R)), (A.index = 0), (A.sibling = null), A)
    }
    function u(A, R, w) {
      return (
        (A.index = w),
        t
          ? ((w = A.alternate),
            w !== null
              ? ((w = w.index), w < R ? ((A.flags |= 67108866), R) : w)
              : ((A.flags |= 67108866), R))
          : ((A.flags |= 1048576), R)
      )
    }
    function d(A) {
      return (t && A.alternate === null && (A.flags |= 67108866), A)
    }
    function y(A, R, w, k) {
      return R === null || R.tag !== 6
        ? ((R = As(w, A.mode, k)), (R.return = A), R)
        : ((R = r(R, w)), (R.return = A), R)
    }
    function E(A, R, w, k) {
      var at = w.type
      return at === M
        ? H(A, R, w.props.children, k, w.key)
        : R !== null &&
            (R.elementType === at ||
              (typeof at == 'object' &&
                at !== null &&
                at.$$typeof === B &&
                ha(at) === R.type))
          ? ((R = r(R, w.props)), ei(R, w), (R.return = A), R)
          : ((R = po(w.type, w.key, w.props, null, A.mode, k)),
            ei(R, w),
            (R.return = A),
            R)
    }
    function z(A, R, w, k) {
      return R === null ||
        R.tag !== 4 ||
        R.stateNode.containerInfo !== w.containerInfo ||
        R.stateNode.implementation !== w.implementation
        ? ((R = Ms(w, A.mode, k)), (R.return = A), R)
        : ((R = r(R, w.children || [])), (R.return = A), R)
    }
    function H(A, R, w, k, at) {
      return R === null || R.tag !== 7
        ? ((R = sa(w, A.mode, k, at)), (R.return = A), R)
        : ((R = r(R, w)), (R.return = A), R)
    }
    function V(A, R, w) {
      if (
        (typeof R == 'string' && R !== '') ||
        typeof R == 'number' ||
        typeof R == 'bigint'
      )
        return ((R = As('' + R, A.mode, w)), (R.return = A), R)
      if (typeof R == 'object' && R !== null) {
        switch (R.$$typeof) {
          case T:
            return (
              (w = po(R.type, R.key, R.props, null, A.mode, w)),
              ei(w, R),
              (w.return = A),
              w
            )
          case N:
            return ((R = Ms(R, A.mode, w)), (R.return = A), R)
          case B:
            return ((R = ha(R)), V(A, R, w))
        }
        if (At(R) || vt(R))
          return ((R = sa(R, A.mode, w, null)), (R.return = A), R)
        if (typeof R.then == 'function') return V(A, Eo(R), w)
        if (R.$$typeof === K) return V(A, yo(A, R), w)
        _o(A, R)
      }
      return null
    }
    function D(A, R, w, k) {
      var at = R !== null ? R.key : null
      if (
        (typeof w == 'string' && w !== '') ||
        typeof w == 'number' ||
        typeof w == 'bigint'
      )
        return at !== null ? null : y(A, R, '' + w, k)
      if (typeof w == 'object' && w !== null) {
        switch (w.$$typeof) {
          case T:
            return w.key === at ? E(A, R, w, k) : null
          case N:
            return w.key === at ? z(A, R, w, k) : null
          case B:
            return ((w = ha(w)), D(A, R, w, k))
        }
        if (At(w) || vt(w)) return at !== null ? null : H(A, R, w, k, null)
        if (typeof w.then == 'function') return D(A, R, Eo(w), k)
        if (w.$$typeof === K) return D(A, R, yo(A, w), k)
        _o(A, w)
      }
      return null
    }
    function L(A, R, w, k, at) {
      if (
        (typeof k == 'string' && k !== '') ||
        typeof k == 'number' ||
        typeof k == 'bigint'
      )
        return ((A = A.get(w) || null), y(R, A, '' + k, at))
      if (typeof k == 'object' && k !== null) {
        switch (k.$$typeof) {
          case T:
            return (
              (A = A.get(k.key === null ? w : k.key) || null),
              E(R, A, k, at)
            )
          case N:
            return (
              (A = A.get(k.key === null ? w : k.key) || null),
              z(R, A, k, at)
            )
          case B:
            return ((k = ha(k)), L(A, R, w, k, at))
        }
        if (At(k) || vt(k))
          return ((A = A.get(w) || null), H(R, A, k, at, null))
        if (typeof k.then == 'function') return L(A, R, w, Eo(k), at)
        if (k.$$typeof === K) return L(A, R, w, yo(R, k), at)
        _o(R, k)
      }
      return null
    }
    function I(A, R, w, k) {
      for (
        var at = null, Et = null, nt = R, dt = (R = 0), yt = null;
        nt !== null && dt < w.length;
        dt++
      ) {
        nt.index > dt ? ((yt = nt), (nt = null)) : (yt = nt.sibling)
        var _t = D(A, nt, w[dt], k)
        if (_t === null) {
          nt === null && (nt = yt)
          break
        }
        ;(t && nt && _t.alternate === null && e(A, nt),
          (R = u(_t, R, dt)),
          Et === null ? (at = _t) : (Et.sibling = _t),
          (Et = _t),
          (nt = yt))
      }
      if (dt === w.length) return (n(A, nt), bt && ln(A, dt), at)
      if (nt === null) {
        for (; dt < w.length; dt++)
          ((nt = V(A, w[dt], k)),
            nt !== null &&
              ((R = u(nt, R, dt)),
              Et === null ? (at = nt) : (Et.sibling = nt),
              (Et = nt)))
        return (bt && ln(A, dt), at)
      }
      for (nt = l(nt); dt < w.length; dt++)
        ((yt = L(nt, A, dt, w[dt], k)),
          yt !== null &&
            (t &&
              yt.alternate !== null &&
              nt.delete(yt.key === null ? dt : yt.key),
            (R = u(yt, R, dt)),
            Et === null ? (at = yt) : (Et.sibling = yt),
            (Et = yt)))
      return (
        t &&
          nt.forEach(function (Pn) {
            return e(A, Pn)
          }),
        bt && ln(A, dt),
        at
      )
    }
    function ot(A, R, w, k) {
      if (w == null) throw Error(s(151))
      for (
        var at = null,
          Et = null,
          nt = R,
          dt = (R = 0),
          yt = null,
          _t = w.next();
        nt !== null && !_t.done;
        dt++, _t = w.next()
      ) {
        nt.index > dt ? ((yt = nt), (nt = null)) : (yt = nt.sibling)
        var Pn = D(A, nt, _t.value, k)
        if (Pn === null) {
          nt === null && (nt = yt)
          break
        }
        ;(t && nt && Pn.alternate === null && e(A, nt),
          (R = u(Pn, R, dt)),
          Et === null ? (at = Pn) : (Et.sibling = Pn),
          (Et = Pn),
          (nt = yt))
      }
      if (_t.done) return (n(A, nt), bt && ln(A, dt), at)
      if (nt === null) {
        for (; !_t.done; dt++, _t = w.next())
          ((_t = V(A, _t.value, k)),
            _t !== null &&
              ((R = u(_t, R, dt)),
              Et === null ? (at = _t) : (Et.sibling = _t),
              (Et = _t)))
        return (bt && ln(A, dt), at)
      }
      for (nt = l(nt); !_t.done; dt++, _t = w.next())
        ((_t = L(nt, A, dt, _t.value, k)),
          _t !== null &&
            (t &&
              _t.alternate !== null &&
              nt.delete(_t.key === null ? dt : _t.key),
            (R = u(_t, R, dt)),
            Et === null ? (at = _t) : (Et.sibling = _t),
            (Et = _t)))
      return (
        t &&
          nt.forEach(function (G0) {
            return e(A, G0)
          }),
        bt && ln(A, dt),
        at
      )
    }
    function Nt(A, R, w, k) {
      if (
        (typeof w == 'object' &&
          w !== null &&
          w.type === M &&
          w.key === null &&
          (w = w.props.children),
        typeof w == 'object' && w !== null)
      ) {
        switch (w.$$typeof) {
          case T:
            t: {
              for (var at = w.key; R !== null; ) {
                if (R.key === at) {
                  if (((at = w.type), at === M)) {
                    if (R.tag === 7) {
                      ;(n(A, R.sibling),
                        (k = r(R, w.props.children)),
                        (k.return = A),
                        (A = k))
                      break t
                    }
                  } else if (
                    R.elementType === at ||
                    (typeof at == 'object' &&
                      at !== null &&
                      at.$$typeof === B &&
                      ha(at) === R.type)
                  ) {
                    ;(n(A, R.sibling),
                      (k = r(R, w.props)),
                      ei(k, w),
                      (k.return = A),
                      (A = k))
                    break t
                  }
                  n(A, R)
                  break
                } else e(A, R)
                R = R.sibling
              }
              w.type === M
                ? ((k = sa(w.props.children, A.mode, k, w.key)),
                  (k.return = A),
                  (A = k))
                : ((k = po(w.type, w.key, w.props, null, A.mode, k)),
                  ei(k, w),
                  (k.return = A),
                  (A = k))
            }
            return d(A)
          case N:
            t: {
              for (at = w.key; R !== null; ) {
                if (R.key === at)
                  if (
                    R.tag === 4 &&
                    R.stateNode.containerInfo === w.containerInfo &&
                    R.stateNode.implementation === w.implementation
                  ) {
                    ;(n(A, R.sibling),
                      (k = r(R, w.children || [])),
                      (k.return = A),
                      (A = k))
                    break t
                  } else {
                    n(A, R)
                    break
                  }
                else e(A, R)
                R = R.sibling
              }
              ;((k = Ms(w, A.mode, k)), (k.return = A), (A = k))
            }
            return d(A)
          case B:
            return ((w = ha(w)), Nt(A, R, w, k))
        }
        if (At(w)) return I(A, R, w, k)
        if (vt(w)) {
          if (((at = vt(w)), typeof at != 'function')) throw Error(s(150))
          return ((w = at.call(w)), ot(A, R, w, k))
        }
        if (typeof w.then == 'function') return Nt(A, R, Eo(w), k)
        if (w.$$typeof === K) return Nt(A, R, yo(A, w), k)
        _o(A, w)
      }
      return (typeof w == 'string' && w !== '') ||
        typeof w == 'number' ||
        typeof w == 'bigint'
        ? ((w = '' + w),
          R !== null && R.tag === 6
            ? (n(A, R.sibling), (k = r(R, w)), (k.return = A), (A = k))
            : (n(A, R), (k = As(w, A.mode, k)), (k.return = A), (A = k)),
          d(A))
        : n(A, R)
    }
    return function (A, R, w, k) {
      try {
        ti = 0
        var at = Nt(A, R, w, k)
        return ((Ia = null), at)
      } catch (nt) {
        if (nt === $a || nt === So) throw nt
        var Et = Se(29, nt, null, A.mode)
        return ((Et.lanes = k), (Et.return = A), Et)
      } finally {
      }
    }
  }
  var pa = Rd(!0),
    Td = Rd(!1),
    zn = !1
  function qs(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    }
  }
  function Ys(t, e) {
    ;((t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        }))
  }
  function Dn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null }
  }
  function Nn(t, e, n) {
    var l = t.updateQueue
    if (l === null) return null
    if (((l = l.shared), (Ct & 2) !== 0)) {
      var r = l.pending
      return (
        r === null ? (e.next = e) : ((e.next = r.next), (r.next = e)),
        (l.pending = e),
        (e = mo(t)),
        sd(t, null, n),
        e
      )
    }
    return (ho(t, l, e, n), mo(t))
  }
  function ni(t, e, n) {
    if (
      ((e = e.updateQueue), e !== null && ((e = e.shared), (n & 4194048) !== 0))
    ) {
      var l = e.lanes
      ;((l &= t.pendingLanes), (n |= l), (e.lanes = n), vf(t, n))
    }
  }
  function Gs(t, e) {
    var n = t.updateQueue,
      l = t.alternate
    if (l !== null && ((l = l.updateQueue), n === l)) {
      var r = null,
        u = null
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          }
          ;(u === null ? (r = u = d) : (u = u.next = d), (n = n.next))
        } while (n !== null)
        u === null ? (r = u = e) : (u = u.next = e)
      } else r = u = e
      ;((n = {
        baseState: l.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: u,
        shared: l.shared,
        callbacks: l.callbacks,
      }),
        (t.updateQueue = n))
      return
    }
    ;((t = n.lastBaseUpdate),
      t === null ? (n.firstBaseUpdate = e) : (t.next = e),
      (n.lastBaseUpdate = e))
  }
  var Vs = !1
  function ai() {
    if (Vs) {
      var t = Wa
      if (t !== null) throw t
    }
  }
  function li(t, e, n, l) {
    Vs = !1
    var r = t.updateQueue
    zn = !1
    var u = r.firstBaseUpdate,
      d = r.lastBaseUpdate,
      y = r.shared.pending
    if (y !== null) {
      r.shared.pending = null
      var E = y,
        z = E.next
      ;((E.next = null), d === null ? (u = z) : (d.next = z), (d = E))
      var H = t.alternate
      H !== null &&
        ((H = H.updateQueue),
        (y = H.lastBaseUpdate),
        y !== d &&
          (y === null ? (H.firstBaseUpdate = z) : (y.next = z),
          (H.lastBaseUpdate = E)))
    }
    if (u !== null) {
      var V = r.baseState
      ;((d = 0), (H = z = E = null), (y = u))
      do {
        var D = y.lane & -536870913,
          L = D !== y.lane
        if (L ? (gt & D) === D : (l & D) === D) {
          ;(D !== 0 && D === Fa && (Vs = !0),
            H !== null &&
              (H = H.next =
                {
                  lane: 0,
                  tag: y.tag,
                  payload: y.payload,
                  callback: null,
                  next: null,
                }))
          t: {
            var I = t,
              ot = y
            D = e
            var Nt = n
            switch (ot.tag) {
              case 1:
                if (((I = ot.payload), typeof I == 'function')) {
                  V = I.call(Nt, V, D)
                  break t
                }
                V = I
                break t
              case 3:
                I.flags = (I.flags & -65537) | 128
              case 0:
                if (
                  ((I = ot.payload),
                  (D = typeof I == 'function' ? I.call(Nt, V, D) : I),
                  D == null)
                )
                  break t
                V = g({}, V, D)
                break t
              case 2:
                zn = !0
            }
          }
          ;((D = y.callback),
            D !== null &&
              ((t.flags |= 64),
              L && (t.flags |= 8192),
              (L = r.callbacks),
              L === null ? (r.callbacks = [D]) : L.push(D)))
        } else
          ((L = {
            lane: D,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null,
          }),
            H === null ? ((z = H = L), (E = V)) : (H = H.next = L),
            (d |= D))
        if (((y = y.next), y === null)) {
          if (((y = r.shared.pending), y === null)) break
          ;((L = y),
            (y = L.next),
            (L.next = null),
            (r.lastBaseUpdate = L),
            (r.shared.pending = null))
        }
      } while (!0)
      ;(H === null && (E = V),
        (r.baseState = E),
        (r.firstBaseUpdate = z),
        (r.lastBaseUpdate = H),
        u === null && (r.shared.lanes = 0),
        (Hn |= d),
        (t.lanes = d),
        (t.memoizedState = V))
    }
  }
  function Cd(t, e) {
    if (typeof t != 'function') throw Error(s(191, t))
    t.call(e)
  }
  function Ad(t, e) {
    var n = t.callbacks
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++) Cd(n[t], e)
  }
  var tl = C(null),
    Ro = C(0)
  function Md(t, e) {
    ;((t = vn), P(Ro, t), P(tl, e), (vn = t | e.baseLanes))
  }
  function Xs() {
    ;(P(Ro, vn), P(tl, tl.current))
  }
  function Qs() {
    ;((vn = Ro.current), q(tl), q(Ro))
  }
  var xe = C(null),
    Ue = null
  function Ln(t) {
    var e = t.alternate
    ;(P(Vt, Vt.current & 1),
      P(xe, t),
      Ue === null &&
        (e === null || tl.current !== null || e.memoizedState !== null) &&
        (Ue = t))
  }
  function Zs(t) {
    ;(P(Vt, Vt.current), P(xe, t), Ue === null && (Ue = t))
  }
  function Od(t) {
    t.tag === 22 ? (P(Vt, Vt.current), P(xe, t), Ue === null && (Ue = t)) : jn()
  }
  function jn() {
    ;(P(Vt, Vt.current), P(xe, xe.current))
  }
  function Ee(t) {
    ;(q(xe), Ue === t && (Ue = null), q(Vt))
  }
  var Vt = C(0)
  function To(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState
        if (n !== null && ((n = n.dehydrated), n === null || $u(n) || Iu(n)))
          return e
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === 'forwards' ||
          e.memoizedProps.revealOrder === 'backwards' ||
          e.memoizedProps.revealOrder === 'unstable_legacy-backwards' ||
          e.memoizedProps.revealOrder === 'together')
      ) {
        if ((e.flags & 128) !== 0) return e
      } else if (e.child !== null) {
        ;((e.child.return = e), (e = e.child))
        continue
      }
      if (e === t) break
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null
        e = e.return
      }
      ;((e.sibling.return = e.return), (e = e.sibling))
    }
    return null
  }
  var sn = 0,
    ft = null,
    zt = null,
    Zt = null,
    Co = !1,
    el = !1,
    va = !1,
    Ao = 0,
    ii = 0,
    nl = null,
    Dy = 0
  function Yt() {
    throw Error(s(321))
  }
  function Ks(t, e) {
    if (e === null) return !1
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!be(t[n], e[n])) return !1
    return !0
  }
  function Ps(t, e, n, l, r, u) {
    return (
      (sn = u),
      (ft = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (j.H = t === null || t.memoizedState === null ? dh : uu),
      (va = !1),
      (u = n(l, r)),
      (va = !1),
      el && (u = zd(e, n, l, r)),
      wd(t),
      u
    )
  }
  function wd(t) {
    j.H = si
    var e = zt !== null && zt.next !== null
    if (((sn = 0), (Zt = zt = ft = null), (Co = !1), (ii = 0), (nl = null), e))
      throw Error(s(300))
    t === null || Kt || ((t = t.dependencies), t !== null && go(t) && (Kt = !0))
  }
  function zd(t, e, n, l) {
    ft = t
    var r = 0
    do {
      if ((el && (nl = null), (ii = 0), (el = !1), 25 <= r)) throw Error(s(301))
      if (((r += 1), (Zt = zt = null), t.updateQueue != null)) {
        var u = t.updateQueue
        ;((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0))
      }
      ;((j.H = hh), (u = e(n, l)))
    } while (el)
    return u
  }
  function Ny() {
    var t = j.H,
      e = t.useState()[0]
    return (
      (e = typeof e.then == 'function' ? oi(e) : e),
      (t = t.useState()[0]),
      (zt !== null ? zt.memoizedState : null) !== t && (ft.flags |= 1024),
      e
    )
  }
  function Js() {
    var t = Ao !== 0
    return ((Ao = 0), t)
  }
  function Fs(t, e, n) {
    ;((e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~n))
  }
  function Ws(t) {
    if (Co) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue
        ;(e !== null && (e.pending = null), (t = t.next))
      }
      Co = !1
    }
    ;((sn = 0), (Zt = zt = ft = null), (el = !1), (ii = Ao = 0), (nl = null))
  }
  function oe() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    }
    return (Zt === null ? (ft.memoizedState = Zt = t) : (Zt = Zt.next = t), Zt)
  }
  function Xt() {
    if (zt === null) {
      var t = ft.alternate
      t = t !== null ? t.memoizedState : null
    } else t = zt.next
    var e = Zt === null ? ft.memoizedState : Zt.next
    if (e !== null) ((Zt = e), (zt = t))
    else {
      if (t === null)
        throw ft.alternate === null ? Error(s(467)) : Error(s(310))
      ;((zt = t),
        (t = {
          memoizedState: zt.memoizedState,
          baseState: zt.baseState,
          baseQueue: zt.baseQueue,
          queue: zt.queue,
          next: null,
        }),
        Zt === null ? (ft.memoizedState = Zt = t) : (Zt = Zt.next = t))
    }
    return Zt
  }
  function Mo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null }
  }
  function oi(t) {
    var e = ii
    return (
      (ii += 1),
      nl === null && (nl = []),
      (t = xd(nl, t, e)),
      (e = ft),
      (Zt === null ? e.memoizedState : Zt.next) === null &&
        ((e = e.alternate),
        (j.H = e === null || e.memoizedState === null ? dh : uu)),
      t
    )
  }
  function Oo(t) {
    if (t !== null && typeof t == 'object') {
      if (typeof t.then == 'function') return oi(t)
      if (t.$$typeof === K) return ee(t)
    }
    throw Error(s(438, String(t)))
  }
  function $s(t) {
    var e = null,
      n = ft.updateQueue
    if ((n !== null && (e = n.memoCache), e == null)) {
      var l = ft.alternate
      l !== null &&
        ((l = l.updateQueue),
        l !== null &&
          ((l = l.memoCache),
          l != null &&
            (e = {
              data: l.data.map(function (r) {
                return r.slice()
              }),
              index: 0,
            })))
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      n === null && ((n = Mo()), (ft.updateQueue = n)),
      (n.memoCache = e),
      (n = e.data[e.index]),
      n === void 0)
    )
      for (n = e.data[e.index] = Array(t), l = 0; l < t; l++) n[l] = ut
    return (e.index++, n)
  }
  function un(t, e) {
    return typeof e == 'function' ? e(t) : e
  }
  function wo(t) {
    var e = Xt()
    return Is(e, zt, t)
  }
  function Is(t, e, n) {
    var l = t.queue
    if (l === null) throw Error(s(311))
    l.lastRenderedReducer = n
    var r = t.baseQueue,
      u = l.pending
    if (u !== null) {
      if (r !== null) {
        var d = r.next
        ;((r.next = u.next), (u.next = d))
      }
      ;((e.baseQueue = r = u), (l.pending = null))
    }
    if (((u = t.baseState), r === null)) t.memoizedState = u
    else {
      e = r.next
      var y = (d = null),
        E = null,
        z = e,
        H = !1
      do {
        var V = z.lane & -536870913
        if (V !== z.lane ? (gt & V) === V : (sn & V) === V) {
          var D = z.revertLane
          if (D === 0)
            (E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              V === Fa && (H = !0))
          else if ((sn & D) === D) {
            ;((z = z.next), D === Fa && (H = !0))
            continue
          } else
            ((V = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              E === null ? ((y = E = V), (d = u)) : (E = E.next = V),
              (ft.lanes |= D),
              (Hn |= D))
          ;((V = z.action),
            va && n(u, V),
            (u = z.hasEagerState ? z.eagerState : n(u, V)))
        } else
          ((D = {
            lane: V,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            E === null ? ((y = E = D), (d = u)) : (E = E.next = D),
            (ft.lanes |= V),
            (Hn |= V))
        z = z.next
      } while (z !== null && z !== e)
      if (
        (E === null ? (d = u) : (E.next = y),
        !be(u, t.memoizedState) && ((Kt = !0), H && ((n = Wa), n !== null)))
      )
        throw n
      ;((t.memoizedState = u),
        (t.baseState = d),
        (t.baseQueue = E),
        (l.lastRenderedState = u))
    }
    return (r === null && (l.lanes = 0), [t.memoizedState, l.dispatch])
  }
  function tu(t) {
    var e = Xt(),
      n = e.queue
    if (n === null) throw Error(s(311))
    n.lastRenderedReducer = t
    var l = n.dispatch,
      r = n.pending,
      u = e.memoizedState
    if (r !== null) {
      n.pending = null
      var d = (r = r.next)
      do ((u = t(u, d.action)), (d = d.next))
      while (d !== r)
      ;(be(u, e.memoizedState) || (Kt = !0),
        (e.memoizedState = u),
        e.baseQueue === null && (e.baseState = u),
        (n.lastRenderedState = u))
    }
    return [u, l]
  }
  function Dd(t, e, n) {
    var l = ft,
      r = Xt(),
      u = bt
    if (u) {
      if (n === void 0) throw Error(s(407))
      n = n()
    } else n = e()
    var d = !be((zt || r).memoizedState, n)
    if (
      (d && ((r.memoizedState = n), (Kt = !0)),
      (r = r.queue),
      au(jd.bind(null, l, r, t), [t]),
      r.getSnapshot !== e || d || (Zt !== null && Zt.memoizedState.tag & 1))
    ) {
      if (
        ((l.flags |= 2048),
        al(9, { destroy: void 0 }, Ld.bind(null, l, r, n, e), null),
        Lt === null)
      )
        throw Error(s(349))
      u || (sn & 127) !== 0 || Nd(l, e, n)
    }
    return n
  }
  function Nd(t, e, n) {
    ;((t.flags |= 16384),
      (t = { getSnapshot: e, value: n }),
      (e = ft.updateQueue),
      e === null
        ? ((e = Mo()), (ft.updateQueue = e), (e.stores = [t]))
        : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t)))
  }
  function Ld(t, e, n, l) {
    ;((e.value = n), (e.getSnapshot = l), Ud(e) && Bd(t))
  }
  function jd(t, e, n) {
    return n(function () {
      Ud(e) && Bd(t)
    })
  }
  function Ud(t) {
    var e = t.getSnapshot
    t = t.value
    try {
      var n = e()
      return !be(t, n)
    } catch {
      return !0
    }
  }
  function Bd(t) {
    var e = ra(t, 2)
    e !== null && me(e, t, 2)
  }
  function eu(t) {
    var e = oe()
    if (typeof t == 'function') {
      var n = t
      if (((t = n()), va)) {
        Rn(!0)
        try {
          n()
        } finally {
          Rn(!1)
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: un,
        lastRenderedState: t,
      }),
      e
    )
  }
  function Hd(t, e, n, l) {
    return ((t.baseState = n), Is(t, zt, typeof l == 'function' ? l : un))
  }
  function Ly(t, e, n, l, r) {
    if (No(t)) throw Error(s(485))
    if (((t = e.action), t !== null)) {
      var u = {
        payload: r,
        action: t,
        next: null,
        isTransition: !0,
        status: 'pending',
        value: null,
        reason: null,
        listeners: [],
        then: function (d) {
          u.listeners.push(d)
        },
      }
      ;(j.T !== null ? n(!0) : (u.isTransition = !1),
        l(u),
        (n = e.pending),
        n === null
          ? ((u.next = e.pending = u), kd(e, u))
          : ((u.next = n.next), (e.pending = n.next = u)))
    }
  }
  function kd(t, e) {
    var n = e.action,
      l = e.payload,
      r = t.state
    if (e.isTransition) {
      var u = j.T,
        d = {}
      j.T = d
      try {
        var y = n(r, l),
          E = j.S
        ;(E !== null && E(d, y), qd(t, e, y))
      } catch (z) {
        nu(t, e, z)
      } finally {
        ;(u !== null && d.types !== null && (u.types = d.types), (j.T = u))
      }
    } else
      try {
        ;((u = n(r, l)), qd(t, e, u))
      } catch (z) {
        nu(t, e, z)
      }
  }
  function qd(t, e, n) {
    n !== null && typeof n == 'object' && typeof n.then == 'function'
      ? n.then(
          function (l) {
            Yd(t, e, l)
          },
          function (l) {
            return nu(t, e, l)
          },
        )
      : Yd(t, e, n)
  }
  function Yd(t, e, n) {
    ;((e.status = 'fulfilled'),
      (e.value = n),
      Gd(e),
      (t.state = n),
      (e = t.pending),
      e !== null &&
        ((n = e.next),
        n === e ? (t.pending = null) : ((n = n.next), (e.next = n), kd(t, n))))
  }
  function nu(t, e, n) {
    var l = t.pending
    if (((t.pending = null), l !== null)) {
      l = l.next
      do ((e.status = 'rejected'), (e.reason = n), Gd(e), (e = e.next))
      while (e !== l)
    }
    t.action = null
  }
  function Gd(t) {
    t = t.listeners
    for (var e = 0; e < t.length; e++) (0, t[e])()
  }
  function Vd(t, e) {
    return e
  }
  function Xd(t, e) {
    if (bt) {
      var n = Lt.formState
      if (n !== null) {
        t: {
          var l = ft
          if (bt) {
            if (Ut) {
              e: {
                for (var r = Ut, u = je; r.nodeType !== 8; ) {
                  if (!u) {
                    r = null
                    break e
                  }
                  if (((r = Be(r.nextSibling)), r === null)) {
                    r = null
                    break e
                  }
                }
                ;((u = r.data), (r = u === 'F!' || u === 'F' ? r : null))
              }
              if (r) {
                ;((Ut = Be(r.nextSibling)), (l = r.data === 'F!'))
                break t
              }
            }
            On(l)
          }
          l = !1
        }
        l && (e = n[0])
      }
    }
    return (
      (n = oe()),
      (n.memoizedState = n.baseState = e),
      (l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vd,
        lastRenderedState: e,
      }),
      (n.queue = l),
      (n = uh.bind(null, ft, l)),
      (l.dispatch = n),
      (l = eu(!1)),
      (u = su.bind(null, ft, !1, l.queue)),
      (l = oe()),
      (r = { state: e, dispatch: null, action: t, pending: null }),
      (l.queue = r),
      (n = Ly.bind(null, ft, r, u, n)),
      (r.dispatch = n),
      (l.memoizedState = t),
      [e, n, !1]
    )
  }
  function Qd(t) {
    var e = Xt()
    return Zd(e, zt, t)
  }
  function Zd(t, e, n) {
    if (
      ((e = Is(t, e, Vd)[0]),
      (t = wo(un)[0]),
      typeof e == 'object' && e !== null && typeof e.then == 'function')
    )
      try {
        var l = oi(e)
      } catch (d) {
        throw d === $a ? So : d
      }
    else l = e
    e = Xt()
    var r = e.queue,
      u = r.dispatch
    return (
      n !== e.memoizedState &&
        ((ft.flags |= 2048),
        al(9, { destroy: void 0 }, jy.bind(null, r, n), null)),
      [l, u, t]
    )
  }
  function jy(t, e) {
    t.action = e
  }
  function Kd(t) {
    var e = Xt(),
      n = zt
    if (n !== null) return Zd(e, n, t)
    ;(Xt(), (e = e.memoizedState), (n = Xt()))
    var l = n.queue.dispatch
    return ((n.memoizedState = t), [e, l, !1])
  }
  function al(t, e, n, l) {
    return (
      (t = { tag: t, create: n, deps: l, inst: e, next: null }),
      (e = ft.updateQueue),
      e === null && ((e = Mo()), (ft.updateQueue = e)),
      (n = e.lastEffect),
      n === null
        ? (e.lastEffect = t.next = t)
        : ((l = n.next), (n.next = t), (t.next = l), (e.lastEffect = t)),
      t
    )
  }
  function Pd() {
    return Xt().memoizedState
  }
  function zo(t, e, n, l) {
    var r = oe()
    ;((ft.flags |= t),
      (r.memoizedState = al(
        1 | e,
        { destroy: void 0 },
        n,
        l === void 0 ? null : l,
      )))
  }
  function Do(t, e, n, l) {
    var r = Xt()
    l = l === void 0 ? null : l
    var u = r.memoizedState.inst
    zt !== null && l !== null && Ks(l, zt.memoizedState.deps)
      ? (r.memoizedState = al(e, u, n, l))
      : ((ft.flags |= t), (r.memoizedState = al(1 | e, u, n, l)))
  }
  function Jd(t, e) {
    zo(8390656, 8, t, e)
  }
  function au(t, e) {
    Do(2048, 8, t, e)
  }
  function Uy(t) {
    ft.flags |= 4
    var e = ft.updateQueue
    if (e === null) ((e = Mo()), (ft.updateQueue = e), (e.events = [t]))
    else {
      var n = e.events
      n === null ? (e.events = [t]) : n.push(t)
    }
  }
  function Fd(t) {
    var e = Xt().memoizedState
    return (
      Uy({ ref: e, nextImpl: t }),
      function () {
        if ((Ct & 2) !== 0) throw Error(s(440))
        return e.impl.apply(void 0, arguments)
      }
    )
  }
  function Wd(t, e) {
    return Do(4, 2, t, e)
  }
  function $d(t, e) {
    return Do(4, 4, t, e)
  }
  function Id(t, e) {
    if (typeof e == 'function') {
      t = t()
      var n = e(t)
      return function () {
        typeof n == 'function' ? n() : e(null)
      }
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null
        }
      )
  }
  function th(t, e, n) {
    ;((n = n != null ? n.concat([t]) : null), Do(4, 4, Id.bind(null, e, t), n))
  }
  function lu() {}
  function eh(t, e) {
    var n = Xt()
    e = e === void 0 ? null : e
    var l = n.memoizedState
    return e !== null && Ks(e, l[1]) ? l[0] : ((n.memoizedState = [t, e]), t)
  }
  function nh(t, e) {
    var n = Xt()
    e = e === void 0 ? null : e
    var l = n.memoizedState
    if (e !== null && Ks(e, l[1])) return l[0]
    if (((l = t()), va)) {
      Rn(!0)
      try {
        t()
      } finally {
        Rn(!1)
      }
    }
    return ((n.memoizedState = [l, e]), l)
  }
  function iu(t, e, n) {
    return n === void 0 || ((sn & 1073741824) !== 0 && (gt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = n), (t = am()), (ft.lanes |= t), (Hn |= t), n)
  }
  function ah(t, e, n, l) {
    return be(n, e)
      ? n
      : tl.current !== null
        ? ((t = iu(t, n, l)), be(t, e) || (Kt = !0), t)
        : (sn & 42) === 0 || ((sn & 1073741824) !== 0 && (gt & 261930) === 0)
          ? ((Kt = !0), (t.memoizedState = n))
          : ((t = am()), (ft.lanes |= t), (Hn |= t), e)
  }
  function lh(t, e, n, l, r) {
    var u = J.p
    J.p = u !== 0 && 8 > u ? u : 8
    var d = j.T,
      y = {}
    ;((j.T = y), su(t, !1, e, n))
    try {
      var E = r(),
        z = j.S
      if (
        (z !== null && z(y, E),
        E !== null && typeof E == 'object' && typeof E.then == 'function')
      ) {
        var H = zy(E, l)
        ri(t, e, H, Te(t))
      } else ri(t, e, l, Te(t))
    } catch (V) {
      ri(t, e, { then: function () {}, status: 'rejected', reason: V }, Te())
    } finally {
      ;((J.p = u),
        d !== null && y.types !== null && (d.types = y.types),
        (j.T = d))
    }
  }
  function By() {}
  function ou(t, e, n, l) {
    if (t.tag !== 5) throw Error(s(476))
    var r = ih(t).queue
    lh(
      t,
      r,
      e,
      Z,
      n === null
        ? By
        : function () {
            return (oh(t), n(l))
          },
    )
  }
  function ih(t) {
    var e = t.memoizedState
    if (e !== null) return e
    e = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: un,
        lastRenderedState: Z,
      },
      next: null,
    }
    var n = {}
    return (
      (e.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: un,
          lastRenderedState: n,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    )
  }
  function oh(t) {
    var e = ih(t)
    ;(e.next === null && (e = t.alternate.memoizedState),
      ri(t, e.next.queue, {}, Te()))
  }
  function ru() {
    return ee(Ri)
  }
  function rh() {
    return Xt().memoizedState
  }
  function sh() {
    return Xt().memoizedState
  }
  function Hy(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Te()
          t = Dn(n)
          var l = Nn(e, t, n)
          ;(l !== null && (me(l, e, n), ni(l, e, n)),
            (e = { cache: Us() }),
            (t.payload = e))
          return
      }
      e = e.return
    }
  }
  function ky(t, e, n) {
    var l = Te()
    ;((n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      No(t)
        ? ch(e, n)
        : ((n = Ts(t, e, n, l)), n !== null && (me(n, t, l), fh(n, e, l))))
  }
  function uh(t, e, n) {
    var l = Te()
    ri(t, e, n, l)
  }
  function ri(t, e, n, l) {
    var r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }
    if (No(t)) ch(e, r)
    else {
      var u = t.alternate
      if (
        t.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = e.lastRenderedReducer), u !== null)
      )
        try {
          var d = e.lastRenderedState,
            y = u(d, n)
          if (((r.hasEagerState = !0), (r.eagerState = y), be(y, d)))
            return (ho(t, e, r, 0), Lt === null && fo(), !1)
        } catch {
        } finally {
        }
      if (((n = Ts(t, e, r, l)), n !== null))
        return (me(n, t, l), fh(n, e, l), !0)
    }
    return !1
  }
  function su(t, e, n, l) {
    if (
      ((l = {
        lane: 2,
        revertLane: qu(),
        gesture: null,
        action: l,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      No(t))
    ) {
      if (e) throw Error(s(479))
    } else ((e = Ts(t, n, l, 2)), e !== null && me(e, t, 2))
  }
  function No(t) {
    var e = t.alternate
    return t === ft || (e !== null && e === ft)
  }
  function ch(t, e) {
    el = Co = !0
    var n = t.pending
    ;(n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
      (t.pending = e))
  }
  function fh(t, e, n) {
    if ((n & 4194048) !== 0) {
      var l = e.lanes
      ;((l &= t.pendingLanes), (n |= l), (e.lanes = n), vf(t, n))
    }
  }
  var si = {
    readContext: ee,
    use: Oo,
    useCallback: Yt,
    useContext: Yt,
    useEffect: Yt,
    useImperativeHandle: Yt,
    useLayoutEffect: Yt,
    useInsertionEffect: Yt,
    useMemo: Yt,
    useReducer: Yt,
    useRef: Yt,
    useState: Yt,
    useDebugValue: Yt,
    useDeferredValue: Yt,
    useTransition: Yt,
    useSyncExternalStore: Yt,
    useId: Yt,
    useHostTransitionStatus: Yt,
    useFormState: Yt,
    useActionState: Yt,
    useOptimistic: Yt,
    useMemoCache: Yt,
    useCacheRefresh: Yt,
  }
  si.useEffectEvent = Yt
  var dh = {
      readContext: ee,
      use: Oo,
      useCallback: function (t, e) {
        return ((oe().memoizedState = [t, e === void 0 ? null : e]), t)
      },
      useContext: ee,
      useEffect: Jd,
      useImperativeHandle: function (t, e, n) {
        ;((n = n != null ? n.concat([t]) : null),
          zo(4194308, 4, Id.bind(null, e, t), n))
      },
      useLayoutEffect: function (t, e) {
        return zo(4194308, 4, t, e)
      },
      useInsertionEffect: function (t, e) {
        zo(4, 2, t, e)
      },
      useMemo: function (t, e) {
        var n = oe()
        e = e === void 0 ? null : e
        var l = t()
        if (va) {
          Rn(!0)
          try {
            t()
          } finally {
            Rn(!1)
          }
        }
        return ((n.memoizedState = [l, e]), l)
      },
      useReducer: function (t, e, n) {
        var l = oe()
        if (n !== void 0) {
          var r = n(e)
          if (va) {
            Rn(!0)
            try {
              n(e)
            } finally {
              Rn(!1)
            }
          }
        } else r = e
        return (
          (l.memoizedState = l.baseState = r),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: r,
          }),
          (l.queue = t),
          (t = t.dispatch = ky.bind(null, ft, t)),
          [l.memoizedState, t]
        )
      },
      useRef: function (t) {
        var e = oe()
        return ((t = { current: t }), (e.memoizedState = t))
      },
      useState: function (t) {
        t = eu(t)
        var e = t.queue,
          n = uh.bind(null, ft, e)
        return ((e.dispatch = n), [t.memoizedState, n])
      },
      useDebugValue: lu,
      useDeferredValue: function (t, e) {
        var n = oe()
        return iu(n, t, e)
      },
      useTransition: function () {
        var t = eu(!1)
        return (
          (t = lh.bind(null, ft, t.queue, !0, !1)),
          (oe().memoizedState = t),
          [!1, t]
        )
      },
      useSyncExternalStore: function (t, e, n) {
        var l = ft,
          r = oe()
        if (bt) {
          if (n === void 0) throw Error(s(407))
          n = n()
        } else {
          if (((n = e()), Lt === null)) throw Error(s(349))
          ;(gt & 127) !== 0 || Nd(l, e, n)
        }
        r.memoizedState = n
        var u = { value: n, getSnapshot: e }
        return (
          (r.queue = u),
          Jd(jd.bind(null, l, u, t), [t]),
          (l.flags |= 2048),
          al(9, { destroy: void 0 }, Ld.bind(null, l, u, n, e), null),
          n
        )
      },
      useId: function () {
        var t = oe(),
          e = Lt.identifierPrefix
        if (bt) {
          var n = Pe,
            l = Ke
          ;((n = (l & ~(1 << (32 - ye(l) - 1))).toString(32) + n),
            (e = '_' + e + 'R_' + n),
            (n = Ao++),
            0 < n && (e += 'H' + n.toString(32)),
            (e += '_'))
        } else ((n = Dy++), (e = '_' + e + 'r_' + n.toString(32) + '_'))
        return (t.memoizedState = e)
      },
      useHostTransitionStatus: ru,
      useFormState: Xd,
      useActionState: Xd,
      useOptimistic: function (t) {
        var e = oe()
        e.memoizedState = e.baseState = t
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        }
        return (
          (e.queue = n),
          (e = su.bind(null, ft, !0, n)),
          (n.dispatch = e),
          [t, e]
        )
      },
      useMemoCache: $s,
      useCacheRefresh: function () {
        return (oe().memoizedState = Hy.bind(null, ft))
      },
      useEffectEvent: function (t) {
        var e = oe(),
          n = { impl: t }
        return (
          (e.memoizedState = n),
          function () {
            if ((Ct & 2) !== 0) throw Error(s(440))
            return n.impl.apply(void 0, arguments)
          }
        )
      },
    },
    uu = {
      readContext: ee,
      use: Oo,
      useCallback: eh,
      useContext: ee,
      useEffect: au,
      useImperativeHandle: th,
      useInsertionEffect: Wd,
      useLayoutEffect: $d,
      useMemo: nh,
      useReducer: wo,
      useRef: Pd,
      useState: function () {
        return wo(un)
      },
      useDebugValue: lu,
      useDeferredValue: function (t, e) {
        var n = Xt()
        return ah(n, zt.memoizedState, t, e)
      },
      useTransition: function () {
        var t = wo(un)[0],
          e = Xt().memoizedState
        return [typeof t == 'boolean' ? t : oi(t), e]
      },
      useSyncExternalStore: Dd,
      useId: rh,
      useHostTransitionStatus: ru,
      useFormState: Qd,
      useActionState: Qd,
      useOptimistic: function (t, e) {
        var n = Xt()
        return Hd(n, zt, t, e)
      },
      useMemoCache: $s,
      useCacheRefresh: sh,
    }
  uu.useEffectEvent = Fd
  var hh = {
    readContext: ee,
    use: Oo,
    useCallback: eh,
    useContext: ee,
    useEffect: au,
    useImperativeHandle: th,
    useInsertionEffect: Wd,
    useLayoutEffect: $d,
    useMemo: nh,
    useReducer: tu,
    useRef: Pd,
    useState: function () {
      return tu(un)
    },
    useDebugValue: lu,
    useDeferredValue: function (t, e) {
      var n = Xt()
      return zt === null ? iu(n, t, e) : ah(n, zt.memoizedState, t, e)
    },
    useTransition: function () {
      var t = tu(un)[0],
        e = Xt().memoizedState
      return [typeof t == 'boolean' ? t : oi(t), e]
    },
    useSyncExternalStore: Dd,
    useId: rh,
    useHostTransitionStatus: ru,
    useFormState: Kd,
    useActionState: Kd,
    useOptimistic: function (t, e) {
      var n = Xt()
      return zt !== null
        ? Hd(n, zt, t, e)
        : ((n.baseState = t), [t, n.queue.dispatch])
    },
    useMemoCache: $s,
    useCacheRefresh: sh,
  }
  hh.useEffectEvent = Fd
  function cu(t, e, n, l) {
    ;((e = t.memoizedState),
      (n = n(l, e)),
      (n = n == null ? e : g({}, e, n)),
      (t.memoizedState = n),
      t.lanes === 0 && (t.updateQueue.baseState = n))
  }
  var fu = {
    enqueueSetState: function (t, e, n) {
      t = t._reactInternals
      var l = Te(),
        r = Dn(l)
      ;((r.payload = e),
        n != null && (r.callback = n),
        (e = Nn(t, r, l)),
        e !== null && (me(e, t, l), ni(e, t, l)))
    },
    enqueueReplaceState: function (t, e, n) {
      t = t._reactInternals
      var l = Te(),
        r = Dn(l)
      ;((r.tag = 1),
        (r.payload = e),
        n != null && (r.callback = n),
        (e = Nn(t, r, l)),
        e !== null && (me(e, t, l), ni(e, t, l)))
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals
      var n = Te(),
        l = Dn(n)
      ;((l.tag = 2),
        e != null && (l.callback = e),
        (e = Nn(t, l, n)),
        e !== null && (me(e, t, n), ni(e, t, n)))
    },
  }
  function mh(t, e, n, l, r, u, d) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == 'function'
        ? t.shouldComponentUpdate(l, u, d)
        : e.prototype && e.prototype.isPureReactComponent
          ? !Pl(n, l) || !Pl(r, u)
          : !0
    )
  }
  function ph(t, e, n, l) {
    ;((t = e.state),
      typeof e.componentWillReceiveProps == 'function' &&
        e.componentWillReceiveProps(n, l),
      typeof e.UNSAFE_componentWillReceiveProps == 'function' &&
        e.UNSAFE_componentWillReceiveProps(n, l),
      e.state !== t && fu.enqueueReplaceState(e, e.state, null))
  }
  function ga(t, e) {
    var n = e
    if ('ref' in e) {
      n = {}
      for (var l in e) l !== 'ref' && (n[l] = e[l])
    }
    if ((t = t.defaultProps)) {
      n === e && (n = g({}, n))
      for (var r in t) n[r] === void 0 && (n[r] = t[r])
    }
    return n
  }
  function vh(t) {
    co(t)
  }
  function gh(t) {
    console.error(t)
  }
  function yh(t) {
    co(t)
  }
  function Lo(t, e) {
    try {
      var n = t.onUncaughtError
      n(e.value, { componentStack: e.stack })
    } catch (l) {
      setTimeout(function () {
        throw l
      })
    }
  }
  function bh(t, e, n) {
    try {
      var l = t.onCaughtError
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null,
      })
    } catch (r) {
      setTimeout(function () {
        throw r
      })
    }
  }
  function du(t, e, n) {
    return (
      (n = Dn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        Lo(t, e)
      }),
      n
    )
  }
  function Sh(t) {
    return ((t = Dn(t)), (t.tag = 3), t)
  }
  function xh(t, e, n, l) {
    var r = n.type.getDerivedStateFromError
    if (typeof r == 'function') {
      var u = l.value
      ;((t.payload = function () {
        return r(u)
      }),
        (t.callback = function () {
          bh(e, n, l)
        }))
    }
    var d = n.stateNode
    d !== null &&
      typeof d.componentDidCatch == 'function' &&
      (t.callback = function () {
        ;(bh(e, n, l),
          typeof r != 'function' &&
            (kn === null ? (kn = new Set([this])) : kn.add(this)))
        var y = l.stack
        this.componentDidCatch(l.value, { componentStack: y !== null ? y : '' })
      })
  }
  function qy(t, e, n, l, r) {
    if (
      ((n.flags |= 32768),
      l !== null && typeof l == 'object' && typeof l.then == 'function')
    ) {
      if (
        ((e = n.alternate),
        e !== null && Ja(e, n, r, !0),
        (n = xe.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              Ue === null ? Zo() : n.alternate === null && Gt === 0 && (Gt = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = r),
              l === xo
                ? (n.flags |= 16384)
                : ((e = n.updateQueue),
                  e === null ? (n.updateQueue = new Set([l])) : e.add(l),
                  Bu(t, l, r)),
              !1
            )
          case 22:
            return (
              (n.flags |= 65536),
              l === xo
                ? (n.flags |= 16384)
                : ((e = n.updateQueue),
                  e === null
                    ? ((e = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l]),
                      }),
                      (n.updateQueue = e))
                    : ((n = e.retryQueue),
                      n === null ? (e.retryQueue = new Set([l])) : n.add(l)),
                  Bu(t, l, r)),
              !1
            )
        }
        throw Error(s(435, n.tag))
      }
      return (Bu(t, l, r), Zo(), !1)
    }
    if (bt)
      return (
        (e = xe.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = r),
            l !== zs && ((t = Error(s(422), { cause: l })), Wl(De(t, n))))
          : (l !== zs && ((e = Error(s(423), { cause: l })), Wl(De(e, n))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (r &= -r),
            (t.lanes |= r),
            (l = De(l, n)),
            (r = du(t.stateNode, l, r)),
            Gs(t, r),
            Gt !== 4 && (Gt = 2)),
        !1
      )
    var u = Error(s(520), { cause: l })
    if (
      ((u = De(u, n)),
      vi === null ? (vi = [u]) : vi.push(u),
      Gt !== 4 && (Gt = 2),
      e === null)
    )
      return !0
    ;((l = De(l, n)), (n = e))
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (t = r & -r),
            (n.lanes |= t),
            (t = du(n.stateNode, l, t)),
            Gs(n, t),
            !1
          )
        case 1:
          if (
            ((e = n.type),
            (u = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == 'function' ||
                (u !== null &&
                  typeof u.componentDidCatch == 'function' &&
                  (kn === null || !kn.has(u)))))
          )
            return (
              (n.flags |= 65536),
              (r &= -r),
              (n.lanes |= r),
              (r = Sh(r)),
              xh(r, t, n, l),
              Gs(n, r),
              !1
            )
      }
      n = n.return
    } while (n !== null)
    return !1
  }
  var hu = Error(s(461)),
    Kt = !1
  function ne(t, e, n, l) {
    e.child = t === null ? Td(e, null, n, l) : pa(e, t.child, n, l)
  }
  function Eh(t, e, n, l, r) {
    n = n.render
    var u = e.ref
    if ('ref' in l) {
      var d = {}
      for (var y in l) y !== 'ref' && (d[y] = l[y])
    } else d = l
    return (
      fa(e),
      (l = Ps(t, e, n, d, u, r)),
      (y = Js()),
      t !== null && !Kt
        ? (Fs(t, e, r), cn(t, e, r))
        : (bt && y && Os(e), (e.flags |= 1), ne(t, e, l, r), e.child)
    )
  }
  function _h(t, e, n, l, r) {
    if (t === null) {
      var u = n.type
      return typeof u == 'function' &&
        !Cs(u) &&
        u.defaultProps === void 0 &&
        n.compare === null
        ? ((e.tag = 15), (e.type = u), Rh(t, e, u, l, r))
        : ((t = po(n.type, null, l, e, e.mode, r)),
          (t.ref = e.ref),
          (t.return = e),
          (e.child = t))
    }
    if (((u = t.child), !xu(t, r))) {
      var d = u.memoizedProps
      if (
        ((n = n.compare), (n = n !== null ? n : Pl), n(d, l) && t.ref === e.ref)
      )
        return cn(t, e, r)
    }
    return (
      (e.flags |= 1),
      (t = an(u, l)),
      (t.ref = e.ref),
      (t.return = e),
      (e.child = t)
    )
  }
  function Rh(t, e, n, l, r) {
    if (t !== null) {
      var u = t.memoizedProps
      if (Pl(u, l) && t.ref === e.ref)
        if (((Kt = !1), (e.pendingProps = l = u), xu(t, r)))
          (t.flags & 131072) !== 0 && (Kt = !0)
        else return ((e.lanes = t.lanes), cn(t, e, r))
    }
    return mu(t, e, n, l, r)
  }
  function Th(t, e, n, l) {
    var r = l.children,
      u = t !== null ? t.memoizedState : null
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      l.mode === 'hidden')
    ) {
      if ((e.flags & 128) !== 0) {
        if (((u = u !== null ? u.baseLanes | n : n), t !== null)) {
          for (l = e.child = t.child, r = 0; l !== null; )
            ((r = r | l.lanes | l.childLanes), (l = l.sibling))
          l = r & ~u
        } else ((l = 0), (e.child = null))
        return Ch(t, e, u, n, l)
      }
      if ((n & 536870912) !== 0)
        ((e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && bo(e, u !== null ? u.cachePool : null),
          u !== null ? Md(e, u) : Xs(),
          Od(e))
      else
        return (
          (l = e.lanes = 536870912),
          Ch(t, e, u !== null ? u.baseLanes | n : n, n, l)
        )
    } else
      u !== null
        ? (bo(e, u.cachePool), Md(e, u), jn(), (e.memoizedState = null))
        : (t !== null && bo(e, null), Xs(), jn())
    return (ne(t, e, r, n), e.child)
  }
  function ui(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    )
  }
  function Ch(t, e, n, l, r) {
    var u = Hs()
    return (
      (u = u === null ? null : { parent: Qt._currentValue, pool: u }),
      (e.memoizedState = { baseLanes: n, cachePool: u }),
      t !== null && bo(e, null),
      Xs(),
      Od(e),
      t !== null && Ja(t, e, l, !0),
      (e.childLanes = r),
      null
    )
  }
  function jo(t, e) {
    return (
      (e = Bo({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    )
  }
  function Ah(t, e, n) {
    return (
      pa(e, t.child, null, n),
      (t = jo(e, e.pendingProps)),
      (t.flags |= 2),
      Ee(e),
      (e.memoizedState = null),
      t
    )
  }
  function Yy(t, e, n) {
    var l = e.pendingProps,
      r = (e.flags & 128) !== 0
    if (((e.flags &= -129), t === null)) {
      if (bt) {
        if (l.mode === 'hidden')
          return ((t = jo(e, l)), (e.lanes = 536870912), ui(null, t))
        if (
          (Zs(e),
          (t = Ut)
            ? ((t = km(t, je)),
              (t = t !== null && t.data === '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: An !== null ? { id: Ke, overflow: Pe } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = cd(t)),
                (n.return = e),
                (e.child = n),
                (te = e),
                (Ut = null)))
            : (t = null),
          t === null)
        )
          throw On(e)
        return ((e.lanes = 536870912), null)
      }
      return jo(e, l)
    }
    var u = t.memoizedState
    if (u !== null) {
      var d = u.dehydrated
      if ((Zs(e), r))
        if (e.flags & 256) ((e.flags &= -257), (e = Ah(t, e, n)))
        else if (e.memoizedState !== null)
          ((e.child = t.child), (e.flags |= 128), (e = null))
        else throw Error(s(558))
      else if (
        (Kt || Ja(t, e, n, !1), (r = (n & t.childLanes) !== 0), Kt || r)
      ) {
        if (
          ((l = Lt),
          l !== null && ((d = gf(l, n)), d !== 0 && d !== u.retryLane))
        )
          throw ((u.retryLane = d), ra(t, d), me(l, t, d), hu)
        ;(Zo(), (e = Ah(t, e, n)))
      } else
        ((t = u.treeContext),
          (Ut = Be(d.nextSibling)),
          (te = e),
          (bt = !0),
          (Mn = null),
          (je = !1),
          t !== null && hd(e, t),
          (e = jo(e, l)),
          (e.flags |= 4096))
      return e
    }
    return (
      (t = an(t.child, { mode: l.mode, children: l.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    )
  }
  function Uo(t, e) {
    var n = e.ref
    if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816)
    else {
      if (typeof n != 'function' && typeof n != 'object') throw Error(s(284))
      ;(t === null || t.ref !== n) && (e.flags |= 4194816)
    }
  }
  function mu(t, e, n, l, r) {
    return (
      fa(e),
      (n = Ps(t, e, n, l, void 0, r)),
      (l = Js()),
      t !== null && !Kt
        ? (Fs(t, e, r), cn(t, e, r))
        : (bt && l && Os(e), (e.flags |= 1), ne(t, e, n, r), e.child)
    )
  }
  function Mh(t, e, n, l, r, u) {
    return (
      fa(e),
      (e.updateQueue = null),
      (n = zd(e, l, n, r)),
      wd(t),
      (l = Js()),
      t !== null && !Kt
        ? (Fs(t, e, u), cn(t, e, u))
        : (bt && l && Os(e), (e.flags |= 1), ne(t, e, n, u), e.child)
    )
  }
  function Oh(t, e, n, l, r) {
    if ((fa(e), e.stateNode === null)) {
      var u = Qa,
        d = n.contextType
      ;(typeof d == 'object' && d !== null && (u = ee(d)),
        (u = new n(l, u)),
        (e.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = fu),
        (e.stateNode = u),
        (u._reactInternals = e),
        (u = e.stateNode),
        (u.props = l),
        (u.state = e.memoizedState),
        (u.refs = {}),
        qs(e),
        (d = n.contextType),
        (u.context = typeof d == 'object' && d !== null ? ee(d) : Qa),
        (u.state = e.memoizedState),
        (d = n.getDerivedStateFromProps),
        typeof d == 'function' && (cu(e, n, d, l), (u.state = e.memoizedState)),
        typeof n.getDerivedStateFromProps == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function' ||
          (typeof u.UNSAFE_componentWillMount != 'function' &&
            typeof u.componentWillMount != 'function') ||
          ((d = u.state),
          typeof u.componentWillMount == 'function' && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == 'function' &&
            u.UNSAFE_componentWillMount(),
          d !== u.state && fu.enqueueReplaceState(u, u.state, null),
          li(e, l, u, r),
          ai(),
          (u.state = e.memoizedState)),
        typeof u.componentDidMount == 'function' && (e.flags |= 4194308),
        (l = !0))
    } else if (t === null) {
      u = e.stateNode
      var y = e.memoizedProps,
        E = ga(n, y)
      u.props = E
      var z = u.context,
        H = n.contextType
      ;((d = Qa), typeof H == 'object' && H !== null && (d = ee(H)))
      var V = n.getDerivedStateFromProps
      ;((H =
        typeof V == 'function' ||
        typeof u.getSnapshotBeforeUpdate == 'function'),
        (y = e.pendingProps !== y),
        H ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((y || z !== d) && ph(e, u, l, d)),
        (zn = !1))
      var D = e.memoizedState
      ;((u.state = D),
        li(e, l, u, r),
        ai(),
        (z = e.memoizedState),
        y || D !== z || zn
          ? (typeof V == 'function' && (cu(e, n, V, l), (z = e.memoizedState)),
            (E = zn || mh(e, n, E, l, D, z, d))
              ? (H ||
                  (typeof u.UNSAFE_componentWillMount != 'function' &&
                    typeof u.componentWillMount != 'function') ||
                  (typeof u.componentWillMount == 'function' &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == 'function' &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == 'function' &&
                  (e.flags |= 4194308))
              : (typeof u.componentDidMount == 'function' &&
                  (e.flags |= 4194308),
                (e.memoizedProps = l),
                (e.memoizedState = z)),
            (u.props = l),
            (u.state = z),
            (u.context = d),
            (l = E))
          : (typeof u.componentDidMount == 'function' && (e.flags |= 4194308),
            (l = !1)))
    } else {
      ;((u = e.stateNode),
        Ys(t, e),
        (d = e.memoizedProps),
        (H = ga(n, d)),
        (u.props = H),
        (V = e.pendingProps),
        (D = u.context),
        (z = n.contextType),
        (E = Qa),
        typeof z == 'object' && z !== null && (E = ee(z)),
        (y = n.getDerivedStateFromProps),
        (z =
          typeof y == 'function' ||
          typeof u.getSnapshotBeforeUpdate == 'function') ||
          (typeof u.UNSAFE_componentWillReceiveProps != 'function' &&
            typeof u.componentWillReceiveProps != 'function') ||
          ((d !== V || D !== E) && ph(e, u, l, E)),
        (zn = !1),
        (D = e.memoizedState),
        (u.state = D),
        li(e, l, u, r),
        ai())
      var L = e.memoizedState
      d !== V ||
      D !== L ||
      zn ||
      (t !== null && t.dependencies !== null && go(t.dependencies))
        ? (typeof y == 'function' && (cu(e, n, y, l), (L = e.memoizedState)),
          (H =
            zn ||
            mh(e, n, H, l, D, L, E) ||
            (t !== null && t.dependencies !== null && go(t.dependencies)))
            ? (z ||
                (typeof u.UNSAFE_componentWillUpdate != 'function' &&
                  typeof u.componentWillUpdate != 'function') ||
                (typeof u.componentWillUpdate == 'function' &&
                  u.componentWillUpdate(l, L, E),
                typeof u.UNSAFE_componentWillUpdate == 'function' &&
                  u.UNSAFE_componentWillUpdate(l, L, E)),
              typeof u.componentDidUpdate == 'function' && (e.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == 'function' &&
                (e.flags |= 1024))
            : (typeof u.componentDidUpdate != 'function' ||
                (d === t.memoizedProps && D === t.memoizedState) ||
                (e.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != 'function' ||
                (d === t.memoizedProps && D === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = l),
              (e.memoizedState = L)),
          (u.props = l),
          (u.state = L),
          (u.context = E),
          (l = H))
        : (typeof u.componentDidUpdate != 'function' ||
            (d === t.memoizedProps && D === t.memoizedState) ||
            (e.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != 'function' ||
            (d === t.memoizedProps && D === t.memoizedState) ||
            (e.flags |= 1024),
          (l = !1))
    }
    return (
      (u = l),
      Uo(t, e),
      (l = (e.flags & 128) !== 0),
      u || l
        ? ((u = e.stateNode),
          (n =
            l && typeof n.getDerivedStateFromError != 'function'
              ? null
              : u.render()),
          (e.flags |= 1),
          t !== null && l
            ? ((e.child = pa(e, t.child, null, r)),
              (e.child = pa(e, null, n, r)))
            : ne(t, e, n, r),
          (e.memoizedState = u.state),
          (t = e.child))
        : (t = cn(t, e, r)),
      t
    )
  }
  function wh(t, e, n, l) {
    return (ua(), (e.flags |= 256), ne(t, e, n, l), e.child)
  }
  var pu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  }
  function vu(t) {
    return { baseLanes: t, cachePool: bd() }
  }
  function gu(t, e, n) {
    return ((t = t !== null ? t.childLanes & ~n : 0), e && (t |= Re), t)
  }
  function zh(t, e, n) {
    var l = e.pendingProps,
      r = !1,
      u = (e.flags & 128) !== 0,
      d
    if (
      ((d = u) ||
        (d =
          t !== null && t.memoizedState === null ? !1 : (Vt.current & 2) !== 0),
      d && ((r = !0), (e.flags &= -129)),
      (d = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (bt) {
        if (
          (r ? Ln(e) : jn(),
          (t = Ut)
            ? ((t = km(t, je)),
              (t = t !== null && t.data !== '&' ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: An !== null ? { id: Ke, overflow: Pe } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = cd(t)),
                (n.return = e),
                (e.child = n),
                (te = e),
                (Ut = null)))
            : (t = null),
          t === null)
        )
          throw On(e)
        return (Iu(t) ? (e.lanes = 32) : (e.lanes = 536870912), null)
      }
      var y = l.children
      return (
        (l = l.fallback),
        r
          ? (jn(),
            (r = e.mode),
            (y = Bo({ mode: 'hidden', children: y }, r)),
            (l = sa(l, r, n, null)),
            (y.return = e),
            (l.return = e),
            (y.sibling = l),
            (e.child = y),
            (l = e.child),
            (l.memoizedState = vu(n)),
            (l.childLanes = gu(t, d, n)),
            (e.memoizedState = pu),
            ui(null, l))
          : (Ln(e), yu(e, y))
      )
    }
    var E = t.memoizedState
    if (E !== null && ((y = E.dehydrated), y !== null)) {
      if (u)
        e.flags & 256
          ? (Ln(e), (e.flags &= -257), (e = bu(t, e, n)))
          : e.memoizedState !== null
            ? (jn(), (e.child = t.child), (e.flags |= 128), (e = null))
            : (jn(),
              (y = l.fallback),
              (r = e.mode),
              (l = Bo({ mode: 'visible', children: l.children }, r)),
              (y = sa(y, r, n, null)),
              (y.flags |= 2),
              (l.return = e),
              (y.return = e),
              (l.sibling = y),
              (e.child = l),
              pa(e, t.child, null, n),
              (l = e.child),
              (l.memoizedState = vu(n)),
              (l.childLanes = gu(t, d, n)),
              (e.memoizedState = pu),
              (e = ui(null, l)))
      else if ((Ln(e), Iu(y))) {
        if (((d = y.nextSibling && y.nextSibling.dataset), d)) var z = d.dgst
        ;((d = z),
          (l = Error(s(419))),
          (l.stack = ''),
          (l.digest = d),
          Wl({ value: l, source: null, stack: null }),
          (e = bu(t, e, n)))
      } else if (
        (Kt || Ja(t, e, n, !1), (d = (n & t.childLanes) !== 0), Kt || d)
      ) {
        if (
          ((d = Lt),
          d !== null && ((l = gf(d, n)), l !== 0 && l !== E.retryLane))
        )
          throw ((E.retryLane = l), ra(t, l), me(d, t, l), hu)
        ;($u(y) || Zo(), (e = bu(t, e, n)))
      } else
        $u(y)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = E.treeContext),
            (Ut = Be(y.nextSibling)),
            (te = e),
            (bt = !0),
            (Mn = null),
            (je = !1),
            t !== null && hd(e, t),
            (e = yu(e, l.children)),
            (e.flags |= 4096))
      return e
    }
    return r
      ? (jn(),
        (y = l.fallback),
        (r = e.mode),
        (E = t.child),
        (z = E.sibling),
        (l = an(E, { mode: 'hidden', children: l.children })),
        (l.subtreeFlags = E.subtreeFlags & 65011712),
        z !== null ? (y = an(z, y)) : ((y = sa(y, r, n, null)), (y.flags |= 2)),
        (y.return = e),
        (l.return = e),
        (l.sibling = y),
        (e.child = l),
        ui(null, l),
        (l = e.child),
        (y = t.child.memoizedState),
        y === null
          ? (y = vu(n))
          : ((r = y.cachePool),
            r !== null
              ? ((E = Qt._currentValue),
                (r = r.parent !== E ? { parent: E, pool: E } : r))
              : (r = bd()),
            (y = { baseLanes: y.baseLanes | n, cachePool: r })),
        (l.memoizedState = y),
        (l.childLanes = gu(t, d, n)),
        (e.memoizedState = pu),
        ui(t.child, l))
      : (Ln(e),
        (n = t.child),
        (t = n.sibling),
        (n = an(n, { mode: 'visible', children: l.children })),
        (n.return = e),
        (n.sibling = null),
        t !== null &&
          ((d = e.deletions),
          d === null ? ((e.deletions = [t]), (e.flags |= 16)) : d.push(t)),
        (e.child = n),
        (e.memoizedState = null),
        n)
  }
  function yu(t, e) {
    return (
      (e = Bo({ mode: 'visible', children: e }, t.mode)),
      (e.return = t),
      (t.child = e)
    )
  }
  function Bo(t, e) {
    return ((t = Se(22, t, null, e)), (t.lanes = 0), t)
  }
  function bu(t, e, n) {
    return (
      pa(e, t.child, null, n),
      (t = yu(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    )
  }
  function Dh(t, e, n) {
    t.lanes |= e
    var l = t.alternate
    ;(l !== null && (l.lanes |= e), Ls(t.return, e, n))
  }
  function Su(t, e, n, l, r, u) {
    var d = t.memoizedState
    d === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: l,
          tail: n,
          tailMode: r,
          treeForkCount: u,
        })
      : ((d.isBackwards = e),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = l),
        (d.tail = n),
        (d.tailMode = r),
        (d.treeForkCount = u))
  }
  function Nh(t, e, n) {
    var l = e.pendingProps,
      r = l.revealOrder,
      u = l.tail
    l = l.children
    var d = Vt.current,
      y = (d & 2) !== 0
    if (
      (y ? ((d = (d & 1) | 2), (e.flags |= 128)) : (d &= 1),
      P(Vt, d),
      ne(t, e, l, n),
      (l = bt ? Fl : 0),
      !y && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && Dh(t, n, e)
        else if (t.tag === 19) Dh(t, n, e)
        else if (t.child !== null) {
          ;((t.child.return = t), (t = t.child))
          continue
        }
        if (t === e) break t
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t
          t = t.return
        }
        ;((t.sibling.return = t.return), (t = t.sibling))
      }
    switch (r) {
      case 'forwards':
        for (n = e.child, r = null; n !== null; )
          ((t = n.alternate),
            t !== null && To(t) === null && (r = n),
            (n = n.sibling))
        ;((n = r),
          n === null
            ? ((r = e.child), (e.child = null))
            : ((r = n.sibling), (n.sibling = null)),
          Su(e, !1, r, n, u, l))
        break
      case 'backwards':
      case 'unstable_legacy-backwards':
        for (n = null, r = e.child, e.child = null; r !== null; ) {
          if (((t = r.alternate), t !== null && To(t) === null)) {
            e.child = r
            break
          }
          ;((t = r.sibling), (r.sibling = n), (n = r), (r = t))
        }
        Su(e, !0, n, null, u, l)
        break
      case 'together':
        Su(e, !1, null, null, void 0, l)
        break
      default:
        e.memoizedState = null
    }
    return e.child
  }
  function cn(t, e, n) {
    if (
      (t !== null && (e.dependencies = t.dependencies),
      (Hn |= e.lanes),
      (n & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Ja(t, e, n, !1), (n & e.childLanes) === 0)) return null
      } else return null
    if (t !== null && e.child !== t.child) throw Error(s(153))
    if (e.child !== null) {
      for (
        t = e.child, n = an(t, t.pendingProps), e.child = n, n.return = e;
        t.sibling !== null;
      )
        ((t = t.sibling),
          (n = n.sibling = an(t, t.pendingProps)),
          (n.return = e))
      n.sibling = null
    }
    return e.child
  }
  function xu(t, e) {
    return (t.lanes & e) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && go(t)))
  }
  function Gy(t, e, n) {
    switch (e.tag) {
      case 3:
        ;(qt(e, e.stateNode.containerInfo),
          wn(e, Qt, t.memoizedState.cache),
          ua())
        break
      case 27:
      case 5:
        re(e)
        break
      case 4:
        qt(e, e.stateNode.containerInfo)
        break
      case 10:
        wn(e, e.type, e.memoizedProps.value)
        break
      case 31:
        if (e.memoizedState !== null) return ((e.flags |= 128), Zs(e), null)
        break
      case 13:
        var l = e.memoizedState
        if (l !== null)
          return l.dehydrated !== null
            ? (Ln(e), (e.flags |= 128), null)
            : (n & e.child.childLanes) !== 0
              ? zh(t, e, n)
              : (Ln(e), (t = cn(t, e, n)), t !== null ? t.sibling : null)
        Ln(e)
        break
      case 19:
        var r = (t.flags & 128) !== 0
        if (
          ((l = (n & e.childLanes) !== 0),
          l || (Ja(t, e, n, !1), (l = (n & e.childLanes) !== 0)),
          r)
        ) {
          if (l) return Nh(t, e, n)
          e.flags |= 128
        }
        if (
          ((r = e.memoizedState),
          r !== null &&
            ((r.rendering = null), (r.tail = null), (r.lastEffect = null)),
          P(Vt, Vt.current),
          l)
        )
          break
        return null
      case 22:
        return ((e.lanes = 0), Th(t, e, n, e.pendingProps))
      case 24:
        wn(e, Qt, t.memoizedState.cache)
    }
    return cn(t, e, n)
  }
  function Lh(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Kt = !0
      else {
        if (!xu(t, n) && (e.flags & 128) === 0) return ((Kt = !1), Gy(t, e, n))
        Kt = (t.flags & 131072) !== 0
      }
    else ((Kt = !1), bt && (e.flags & 1048576) !== 0 && dd(e, Fl, e.index))
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var l = e.pendingProps
          if (((t = ha(e.elementType)), (e.type = t), typeof t == 'function'))
            Cs(t)
              ? ((l = ga(t, l)), (e.tag = 1), (e = Oh(null, e, t, l, n)))
              : ((e.tag = 0), (e = mu(null, e, t, l, n)))
          else {
            if (t != null) {
              var r = t.$$typeof
              if (r === X) {
                ;((e.tag = 11), (e = Eh(null, e, t, l, n)))
                break t
              } else if (r === Y) {
                ;((e.tag = 14), (e = _h(null, e, t, l, n)))
                break t
              }
            }
            throw ((e = jt(t) || t), Error(s(306, e, '')))
          }
        }
        return e
      case 0:
        return mu(t, e, e.type, e.pendingProps, n)
      case 1:
        return ((l = e.type), (r = ga(l, e.pendingProps)), Oh(t, e, l, r, n))
      case 3:
        t: {
          if ((qt(e, e.stateNode.containerInfo), t === null))
            throw Error(s(387))
          l = e.pendingProps
          var u = e.memoizedState
          ;((r = u.element), Ys(t, e), li(e, l, null, n))
          var d = e.memoizedState
          if (
            ((l = d.cache),
            wn(e, Qt, l),
            l !== u.cache && js(e, [Qt], n, !0),
            ai(),
            (l = d.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: l, isDehydrated: !1, cache: d.cache }),
              (e.updateQueue.baseState = u),
              (e.memoizedState = u),
              e.flags & 256)
            ) {
              e = wh(t, e, l, n)
              break t
            } else if (l !== r) {
              ;((r = De(Error(s(424)), e)), Wl(r), (e = wh(t, e, l, n)))
              break t
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body
                  break
                default:
                  t = t.nodeName === 'HTML' ? t.ownerDocument.body : t
              }
              for (
                Ut = Be(t.firstChild),
                  te = e,
                  bt = !0,
                  Mn = null,
                  je = !0,
                  n = Td(e, null, l, n),
                  e.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling))
            }
          else {
            if ((ua(), l === r)) {
              e = cn(t, e, n)
              break t
            }
            ne(t, e, l, n)
          }
          e = e.child
        }
        return e
      case 26:
        return (
          Uo(t, e),
          t === null
            ? (n = Qm(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = n)
              : bt ||
                ((n = e.type),
                (t = e.pendingProps),
                (l = Io(rt.current).createElement(n)),
                (l[It] = e),
                (l[se] = t),
                ae(l, n, t),
                Wt(l),
                (e.stateNode = l))
            : (e.memoizedState = Qm(
                e.type,
                t.memoizedProps,
                e.pendingProps,
                t.memoizedState,
              )),
          null
        )
      case 27:
        return (
          re(e),
          t === null &&
            bt &&
            ((l = e.stateNode = Gm(e.type, e.pendingProps, rt.current)),
            (te = e),
            (je = !0),
            (r = Ut),
            Vn(e.type) ? ((tc = r), (Ut = Be(l.firstChild))) : (Ut = r)),
          ne(t, e, e.pendingProps.children, n),
          Uo(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        )
      case 5:
        return (
          t === null &&
            bt &&
            ((r = l = Ut) &&
              ((l = y0(l, e.type, e.pendingProps, je)),
              l !== null
                ? ((e.stateNode = l),
                  (te = e),
                  (Ut = Be(l.firstChild)),
                  (je = !1),
                  (r = !0))
                : (r = !1)),
            r || On(e)),
          re(e),
          (r = e.type),
          (u = e.pendingProps),
          (d = t !== null ? t.memoizedProps : null),
          (l = u.children),
          Ju(r, u) ? (l = null) : d !== null && Ju(r, d) && (e.flags |= 32),
          e.memoizedState !== null &&
            ((r = Ps(t, e, Ny, null, null, n)), (Ri._currentValue = r)),
          Uo(t, e),
          ne(t, e, l, n),
          e.child
        )
      case 6:
        return (
          t === null &&
            bt &&
            ((t = n = Ut) &&
              ((n = b0(n, e.pendingProps, je)),
              n !== null
                ? ((e.stateNode = n), (te = e), (Ut = null), (t = !0))
                : (t = !1)),
            t || On(e)),
          null
        )
      case 13:
        return zh(t, e, n)
      case 4:
        return (
          qt(e, e.stateNode.containerInfo),
          (l = e.pendingProps),
          t === null ? (e.child = pa(e, null, l, n)) : ne(t, e, l, n),
          e.child
        )
      case 11:
        return Eh(t, e, e.type, e.pendingProps, n)
      case 7:
        return (ne(t, e, e.pendingProps, n), e.child)
      case 8:
        return (ne(t, e, e.pendingProps.children, n), e.child)
      case 12:
        return (ne(t, e, e.pendingProps.children, n), e.child)
      case 10:
        return (
          (l = e.pendingProps),
          wn(e, e.type, l.value),
          ne(t, e, l.children, n),
          e.child
        )
      case 9:
        return (
          (r = e.type._context),
          (l = e.pendingProps.children),
          fa(e),
          (r = ee(r)),
          (l = l(r)),
          (e.flags |= 1),
          ne(t, e, l, n),
          e.child
        )
      case 14:
        return _h(t, e, e.type, e.pendingProps, n)
      case 15:
        return Rh(t, e, e.type, e.pendingProps, n)
      case 19:
        return Nh(t, e, n)
      case 31:
        return Yy(t, e, n)
      case 22:
        return Th(t, e, n, e.pendingProps)
      case 24:
        return (
          fa(e),
          (l = ee(Qt)),
          t === null
            ? ((r = Hs()),
              r === null &&
                ((r = Lt),
                (u = Us()),
                (r.pooledCache = u),
                u.refCount++,
                u !== null && (r.pooledCacheLanes |= n),
                (r = u)),
              (e.memoizedState = { parent: l, cache: r }),
              qs(e),
              wn(e, Qt, r))
            : ((t.lanes & n) !== 0 && (Ys(t, e), li(e, null, null, n), ai()),
              (r = t.memoizedState),
              (u = e.memoizedState),
              r.parent !== l
                ? ((r = { parent: l, cache: l }),
                  (e.memoizedState = r),
                  e.lanes === 0 &&
                    (e.memoizedState = e.updateQueue.baseState = r),
                  wn(e, Qt, l))
                : ((l = u.cache),
                  wn(e, Qt, l),
                  l !== r.cache && js(e, [Qt], n, !0))),
          ne(t, e, e.pendingProps.children, n),
          e.child
        )
      case 29:
        throw e.pendingProps
    }
    throw Error(s(156, e.tag))
  }
  function fn(t) {
    t.flags |= 4
  }
  function Eu(t, e, n, l, r) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (r & 335544128) === r))
        if (t.stateNode.complete) t.flags |= 8192
        else if (rm()) t.flags |= 8192
        else throw ((ma = xo), ks)
    } else t.flags &= -16777217
  }
  function jh(t, e) {
    if (e.type !== 'stylesheet' || (e.state.loading & 4) !== 0)
      t.flags &= -16777217
    else if (((t.flags |= 16777216), !Fm(e)))
      if (rm()) t.flags |= 8192
      else throw ((ma = xo), ks)
  }
  function Ho(t, e) {
    ;(e !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((e = t.tag !== 22 ? mf() : 536870912), (t.lanes |= e), (rl |= e)))
  }
  function ci(t, e) {
    if (!bt)
      switch (t.tailMode) {
        case 'hidden':
          e = t.tail
          for (var n = null; e !== null; )
            (e.alternate !== null && (n = e), (e = e.sibling))
          n === null ? (t.tail = null) : (n.sibling = null)
          break
        case 'collapsed':
          n = t.tail
          for (var l = null; n !== null; )
            (n.alternate !== null && (l = n), (n = n.sibling))
          l === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (l.sibling = null)
      }
  }
  function Bt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      n = 0,
      l = 0
    if (e)
      for (var r = t.child; r !== null; )
        ((n |= r.lanes | r.childLanes),
          (l |= r.subtreeFlags & 65011712),
          (l |= r.flags & 65011712),
          (r.return = t),
          (r = r.sibling))
    else
      for (r = t.child; r !== null; )
        ((n |= r.lanes | r.childLanes),
          (l |= r.subtreeFlags),
          (l |= r.flags),
          (r.return = t),
          (r = r.sibling))
    return ((t.subtreeFlags |= l), (t.childLanes = n), e)
  }
  function Vy(t, e, n) {
    var l = e.pendingProps
    switch ((ws(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Bt(e), null)
      case 1:
        return (Bt(e), null)
      case 3:
        return (
          (n = e.stateNode),
          (l = null),
          t !== null && (l = t.memoizedState.cache),
          e.memoizedState.cache !== l && (e.flags |= 2048),
          rn(Qt),
          St(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (t === null || t.child === null) &&
            (Pa(e)
              ? fn(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), Ds())),
          Bt(e),
          null
        )
      case 26:
        var r = e.type,
          u = e.memoizedState
        return (
          t === null
            ? (fn(e),
              u !== null ? (Bt(e), jh(e, u)) : (Bt(e), Eu(e, r, null, l, n)))
            : u
              ? u !== t.memoizedState
                ? (fn(e), Bt(e), jh(e, u))
                : (Bt(e), (e.flags &= -16777217))
              : ((t = t.memoizedProps),
                t !== l && fn(e),
                Bt(e),
                Eu(e, r, t, l, n)),
          null
        )
      case 27:
        if (
          (Me(e),
          (n = rt.current),
          (r = e.type),
          t !== null && e.stateNode != null)
        )
          t.memoizedProps !== l && fn(e)
        else {
          if (!l) {
            if (e.stateNode === null) throw Error(s(166))
            return (Bt(e), null)
          }
          ;((t = F.current),
            Pa(e) ? md(e) : ((t = Gm(r, l, n)), (e.stateNode = t), fn(e)))
        }
        return (Bt(e), null)
      case 5:
        if ((Me(e), (r = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== l && fn(e)
        else {
          if (!l) {
            if (e.stateNode === null) throw Error(s(166))
            return (Bt(e), null)
          }
          if (((u = F.current), Pa(e))) md(e)
          else {
            var d = Io(rt.current)
            switch (u) {
              case 1:
                u = d.createElementNS('http://www.w3.org/2000/svg', r)
                break
              case 2:
                u = d.createElementNS('http://www.w3.org/1998/Math/MathML', r)
                break
              default:
                switch (r) {
                  case 'svg':
                    u = d.createElementNS('http://www.w3.org/2000/svg', r)
                    break
                  case 'math':
                    u = d.createElementNS(
                      'http://www.w3.org/1998/Math/MathML',
                      r,
                    )
                    break
                  case 'script':
                    ;((u = d.createElement('div')),
                      (u.innerHTML = '<script><\/script>'),
                      (u = u.removeChild(u.firstChild)))
                    break
                  case 'select':
                    ;((u =
                      typeof l.is == 'string'
                        ? d.createElement('select', { is: l.is })
                        : d.createElement('select')),
                      l.multiple
                        ? (u.multiple = !0)
                        : l.size && (u.size = l.size))
                    break
                  default:
                    u =
                      typeof l.is == 'string'
                        ? d.createElement(r, { is: l.is })
                        : d.createElement(r)
                }
            }
            ;((u[It] = e), (u[se] = l))
            t: for (d = e.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6) u.appendChild(d.stateNode)
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                ;((d.child.return = d), (d = d.child))
                continue
              }
              if (d === e) break t
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === e) break t
                d = d.return
              }
              ;((d.sibling.return = d.return), (d = d.sibling))
            }
            e.stateNode = u
            t: switch ((ae(u, r, l), r)) {
              case 'button':
              case 'input':
              case 'select':
              case 'textarea':
                l = !!l.autoFocus
                break t
              case 'img':
                l = !0
                break t
              default:
                l = !1
            }
            l && fn(e)
          }
        }
        return (
          Bt(e),
          Eu(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, n),
          null
        )
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== l && fn(e)
        else {
          if (typeof l != 'string' && e.stateNode === null) throw Error(s(166))
          if (((t = rt.current), Pa(e))) {
            if (
              ((t = e.stateNode),
              (n = e.memoizedProps),
              (l = null),
              (r = te),
              r !== null)
            )
              switch (r.tag) {
                case 27:
                case 5:
                  l = r.memoizedProps
              }
            ;((t[It] = e),
              (t = !!(
                t.nodeValue === n ||
                (l !== null && l.suppressHydrationWarning === !0) ||
                zm(t.nodeValue, n)
              )),
              t || On(e, !0))
          } else ((t = Io(t).createTextNode(l)), (t[It] = e), (e.stateNode = t))
        }
        return (Bt(e), null)
      case 31:
        if (((n = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((l = Pa(e)), n !== null)) {
            if (t === null) {
              if (!l) throw Error(s(318))
              if (
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(s(557))
              t[It] = e
            } else
              (ua(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4))
            ;(Bt(e), (t = !1))
          } else
            ((n = Ds()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = n),
              (t = !0))
          if (!t) return e.flags & 256 ? (Ee(e), e) : (Ee(e), null)
          if ((e.flags & 128) !== 0) throw Error(s(558))
        }
        return (Bt(e), null)
      case 13:
        if (
          ((l = e.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((r = Pa(e)), l !== null && l.dehydrated !== null)) {
            if (t === null) {
              if (!r) throw Error(s(318))
              if (
                ((r = e.memoizedState),
                (r = r !== null ? r.dehydrated : null),
                !r)
              )
                throw Error(s(317))
              r[It] = e
            } else
              (ua(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4))
            ;(Bt(e), (r = !1))
          } else
            ((r = Ds()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = r),
              (r = !0))
          if (!r) return e.flags & 256 ? (Ee(e), e) : (Ee(e), null)
        }
        return (
          Ee(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = n), e)
            : ((n = l !== null),
              (t = t !== null && t.memoizedState !== null),
              n &&
                ((l = e.child),
                (r = null),
                l.alternate !== null &&
                  l.alternate.memoizedState !== null &&
                  l.alternate.memoizedState.cachePool !== null &&
                  (r = l.alternate.memoizedState.cachePool.pool),
                (u = null),
                l.memoizedState !== null &&
                  l.memoizedState.cachePool !== null &&
                  (u = l.memoizedState.cachePool.pool),
                u !== r && (l.flags |= 2048)),
              n !== t && n && (e.child.flags |= 8192),
              Ho(e, e.updateQueue),
              Bt(e),
              null)
        )
      case 4:
        return (St(), t === null && Xu(e.stateNode.containerInfo), Bt(e), null)
      case 10:
        return (rn(e.type), Bt(e), null)
      case 19:
        if ((q(Vt), (l = e.memoizedState), l === null)) return (Bt(e), null)
        if (((r = (e.flags & 128) !== 0), (u = l.rendering), u === null))
          if (r) ci(l, !1)
          else {
            if (Gt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((u = To(t)), u !== null)) {
                  for (
                    e.flags |= 128,
                      ci(l, !1),
                      t = u.updateQueue,
                      e.updateQueue = t,
                      Ho(e, t),
                      e.subtreeFlags = 0,
                      t = n,
                      n = e.child;
                    n !== null;
                  )
                    (ud(n, t), (n = n.sibling))
                  return (
                    P(Vt, (Vt.current & 1) | 2),
                    bt && ln(e, l.treeForkCount),
                    e.child
                  )
                }
                t = t.sibling
              }
            l.tail !== null &&
              Tt() > Vo &&
              ((e.flags |= 128), (r = !0), ci(l, !1), (e.lanes = 4194304))
          }
        else {
          if (!r)
            if (((t = To(u)), t !== null)) {
              if (
                ((e.flags |= 128),
                (r = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Ho(e, t),
                ci(l, !0),
                l.tail === null &&
                  l.tailMode === 'hidden' &&
                  !u.alternate &&
                  !bt)
              )
                return (Bt(e), null)
            } else
              2 * Tt() - l.renderingStartTime > Vo &&
                n !== 536870912 &&
                ((e.flags |= 128), (r = !0), ci(l, !1), (e.lanes = 4194304))
          l.isBackwards
            ? ((u.sibling = e.child), (e.child = u))
            : ((t = l.last),
              t !== null ? (t.sibling = u) : (e.child = u),
              (l.last = u))
        }
        return l.tail !== null
          ? ((t = l.tail),
            (l.rendering = t),
            (l.tail = t.sibling),
            (l.renderingStartTime = Tt()),
            (t.sibling = null),
            (n = Vt.current),
            P(Vt, r ? (n & 1) | 2 : n & 1),
            bt && ln(e, l.treeForkCount),
            t)
          : (Bt(e), null)
      case 22:
      case 23:
        return (
          Ee(e),
          Qs(),
          (l = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== l && (e.flags |= 8192)
            : l && (e.flags |= 8192),
          l
            ? (n & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Bt(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Bt(e),
          (n = e.updateQueue),
          n !== null && Ho(e, n.retryQueue),
          (n = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
          (l = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          l !== n && (e.flags |= 2048),
          t !== null && q(da),
          null
        )
      case 24:
        return (
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          rn(Qt),
          Bt(e),
          null
        )
      case 25:
        return null
      case 30:
        return null
    }
    throw Error(s(156, e.tag))
  }
  function Xy(t, e) {
    switch ((ws(e), e.tag)) {
      case 1:
        return (
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        )
      case 3:
        return (
          rn(Qt),
          St(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((e.flags = (t & -65537) | 128), e)
            : null
        )
      case 26:
      case 27:
      case 5:
        return (Me(e), null)
      case 31:
        if (e.memoizedState !== null) {
          if ((Ee(e), e.alternate === null)) throw Error(s(340))
          ua()
        }
        return (
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        )
      case 13:
        if (
          (Ee(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (e.alternate === null) throw Error(s(340))
          ua()
        }
        return (
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        )
      case 19:
        return (q(Vt), null)
      case 4:
        return (St(), null)
      case 10:
        return (rn(e.type), null)
      case 22:
      case 23:
        return (
          Ee(e),
          Qs(),
          t !== null && q(da),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        )
      case 24:
        return (rn(Qt), null)
      case 25:
        return null
      default:
        return null
    }
  }
  function Uh(t, e) {
    switch ((ws(e), e.tag)) {
      case 3:
        ;(rn(Qt), St())
        break
      case 26:
      case 27:
      case 5:
        Me(e)
        break
      case 4:
        St()
        break
      case 31:
        e.memoizedState !== null && Ee(e)
        break
      case 13:
        Ee(e)
        break
      case 19:
        q(Vt)
        break
      case 10:
        rn(e.type)
        break
      case 22:
      case 23:
        ;(Ee(e), Qs(), t !== null && q(da))
        break
      case 24:
        rn(Qt)
    }
  }
  function fi(t, e) {
    try {
      var n = e.updateQueue,
        l = n !== null ? n.lastEffect : null
      if (l !== null) {
        var r = l.next
        n = r
        do {
          if ((n.tag & t) === t) {
            l = void 0
            var u = n.create,
              d = n.inst
            ;((l = u()), (d.destroy = l))
          }
          n = n.next
        } while (n !== r)
      }
    } catch (y) {
      Ot(e, e.return, y)
    }
  }
  function Un(t, e, n) {
    try {
      var l = e.updateQueue,
        r = l !== null ? l.lastEffect : null
      if (r !== null) {
        var u = r.next
        l = u
        do {
          if ((l.tag & t) === t) {
            var d = l.inst,
              y = d.destroy
            if (y !== void 0) {
              ;((d.destroy = void 0), (r = e))
              var E = n,
                z = y
              try {
                z()
              } catch (H) {
                Ot(r, E, H)
              }
            }
          }
          l = l.next
        } while (l !== u)
      }
    } catch (H) {
      Ot(e, e.return, H)
    }
  }
  function Bh(t) {
    var e = t.updateQueue
    if (e !== null) {
      var n = t.stateNode
      try {
        Ad(e, n)
      } catch (l) {
        Ot(t, t.return, l)
      }
    }
  }
  function Hh(t, e, n) {
    ;((n.props = ga(t.type, t.memoizedProps)), (n.state = t.memoizedState))
    try {
      n.componentWillUnmount()
    } catch (l) {
      Ot(t, e, l)
    }
  }
  function di(t, e) {
    try {
      var n = t.ref
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode
            break
          case 30:
            l = t.stateNode
            break
          default:
            l = t.stateNode
        }
        typeof n == 'function' ? (t.refCleanup = n(l)) : (n.current = l)
      }
    } catch (r) {
      Ot(t, e, r)
    }
  }
  function Je(t, e) {
    var n = t.ref,
      l = t.refCleanup
    if (n !== null)
      if (typeof l == 'function')
        try {
          l()
        } catch (r) {
          Ot(t, e, r)
        } finally {
          ;((t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null))
        }
      else if (typeof n == 'function')
        try {
          n(null)
        } catch (r) {
          Ot(t, e, r)
        }
      else n.current = null
  }
  function kh(t) {
    var e = t.type,
      n = t.memoizedProps,
      l = t.stateNode
    try {
      t: switch (e) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
          n.autoFocus && l.focus()
          break t
        case 'img':
          n.src ? (l.src = n.src) : n.srcSet && (l.srcset = n.srcSet)
      }
    } catch (r) {
      Ot(t, t.return, r)
    }
  }
  function _u(t, e, n) {
    try {
      var l = t.stateNode
      ;(d0(l, t.type, n, e), (l[se] = e))
    } catch (r) {
      Ot(t, t.return, r)
    }
  }
  function qh(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && Vn(t.type)) ||
      t.tag === 4
    )
  }
  function Ru(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || qh(t.return)) return null
        t = t.return
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
      ) {
        if (
          (t.tag === 27 && Vn(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t
        ;((t.child.return = t), (t = t.child))
      }
      if (!(t.flags & 2)) return t.stateNode
    }
  }
  function Tu(t, e, n) {
    var l = t.tag
    if (l === 5 || l === 6)
      ((t = t.stateNode),
        e
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === 'HTML'
                ? n.ownerDocument.body
                : n
            ).insertBefore(t, e)
          : ((e =
              n.nodeType === 9
                ? n.body
                : n.nodeName === 'HTML'
                  ? n.ownerDocument.body
                  : n),
            e.appendChild(t),
            (n = n._reactRootContainer),
            n != null || e.onclick !== null || (e.onclick = en)))
    else if (
      l !== 4 &&
      (l === 27 && Vn(t.type) && ((n = t.stateNode), (e = null)),
      (t = t.child),
      t !== null)
    )
      for (Tu(t, e, n), t = t.sibling; t !== null; )
        (Tu(t, e, n), (t = t.sibling))
  }
  function ko(t, e, n) {
    var l = t.tag
    if (l === 5 || l === 6)
      ((t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t))
    else if (
      l !== 4 &&
      (l === 27 && Vn(t.type) && (n = t.stateNode), (t = t.child), t !== null)
    )
      for (ko(t, e, n), t = t.sibling; t !== null; )
        (ko(t, e, n), (t = t.sibling))
  }
  function Yh(t) {
    var e = t.stateNode,
      n = t.memoizedProps
    try {
      for (var l = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0])
      ;(ae(e, l, n), (e[It] = t), (e[se] = n))
    } catch (u) {
      Ot(t, t.return, u)
    }
  }
  var dn = !1,
    Pt = !1,
    Cu = !1,
    Gh = typeof WeakSet == 'function' ? WeakSet : Set,
    $t = null
  function Qy(t, e) {
    if (((t = t.containerInfo), (Ku = or), (t = td(t)), bs(t))) {
      if ('selectionStart' in t)
        var n = { start: t.selectionStart, end: t.selectionEnd }
      else
        t: {
          n = ((n = t.ownerDocument) && n.defaultView) || window
          var l = n.getSelection && n.getSelection()
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode
            var r = l.anchorOffset,
              u = l.focusNode
            l = l.focusOffset
            try {
              ;(n.nodeType, u.nodeType)
            } catch {
              n = null
              break t
            }
            var d = 0,
              y = -1,
              E = -1,
              z = 0,
              H = 0,
              V = t,
              D = null
            e: for (;;) {
              for (
                var L;
                V !== n || (r !== 0 && V.nodeType !== 3) || (y = d + r),
                  V !== u || (l !== 0 && V.nodeType !== 3) || (E = d + l),
                  V.nodeType === 3 && (d += V.nodeValue.length),
                  (L = V.firstChild) !== null;
              )
                ((D = V), (V = L))
              for (;;) {
                if (V === t) break e
                if (
                  (D === n && ++z === r && (y = d),
                  D === u && ++H === l && (E = d),
                  (L = V.nextSibling) !== null)
                )
                  break
                ;((V = D), (D = V.parentNode))
              }
              V = L
            }
            n = y === -1 || E === -1 ? null : { start: y, end: E }
          } else n = null
        }
      n = n || { start: 0, end: 0 }
    } else n = null
    for (
      Pu = { focusedElem: t, selectionRange: n }, or = !1, $t = e;
      $t !== null;
    )
      if (
        ((e = $t), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null)
      )
        ((t.return = e), ($t = t))
      else
        for (; $t !== null; ) {
          switch (((e = $t), (u = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (n = 0; n < t.length; n++)
                  ((r = t[n]), (r.ref.impl = r.nextImpl))
              break
            case 11:
            case 15:
              break
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                ;((t = void 0),
                  (n = e),
                  (r = u.memoizedProps),
                  (u = u.memoizedState),
                  (l = n.stateNode))
                try {
                  var I = ga(n.type, r)
                  ;((t = l.getSnapshotBeforeUpdate(I, u)),
                    (l.__reactInternalSnapshotBeforeUpdate = t))
                } catch (ot) {
                  Ot(n, n.return, ot)
                }
              }
              break
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = e.stateNode.containerInfo), (n = t.nodeType), n === 9)
                )
                  Wu(t)
                else if (n === 1)
                  switch (t.nodeName) {
                    case 'HEAD':
                    case 'HTML':
                    case 'BODY':
                      Wu(t)
                      break
                    default:
                      t.textContent = ''
                  }
              }
              break
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break
            default:
              if ((t & 1024) !== 0) throw Error(s(163))
          }
          if (((t = e.sibling), t !== null)) {
            ;((t.return = e.return), ($t = t))
            break
          }
          $t = e.return
        }
  }
  function Vh(t, e, n) {
    var l = n.flags
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ;(mn(t, n), l & 4 && fi(5, n))
        break
      case 1:
        if ((mn(t, n), l & 4))
          if (((t = n.stateNode), e === null))
            try {
              t.componentDidMount()
            } catch (d) {
              Ot(n, n.return, d)
            }
          else {
            var r = ga(n.type, e.memoizedProps)
            e = e.memoizedState
            try {
              t.componentDidUpdate(r, e, t.__reactInternalSnapshotBeforeUpdate)
            } catch (d) {
              Ot(n, n.return, d)
            }
          }
        ;(l & 64 && Bh(n), l & 512 && di(n, n.return))
        break
      case 3:
        if ((mn(t, n), l & 64 && ((t = n.updateQueue), t !== null))) {
          if (((e = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode
                break
              case 1:
                e = n.child.stateNode
            }
          try {
            Ad(t, e)
          } catch (d) {
            Ot(n, n.return, d)
          }
        }
        break
      case 27:
        e === null && l & 4 && Yh(n)
      case 26:
      case 5:
        ;(mn(t, n), e === null && l & 4 && kh(n), l & 512 && di(n, n.return))
        break
      case 12:
        mn(t, n)
        break
      case 31:
        ;(mn(t, n), l & 4 && Zh(t, n))
        break
      case 13:
        ;(mn(t, n),
          l & 4 && Kh(t, n),
          l & 64 &&
            ((t = n.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((n = t0.bind(null, n)), S0(t, n)))))
        break
      case 22:
        if (((l = n.memoizedState !== null || dn), !l)) {
          ;((e = (e !== null && e.memoizedState !== null) || Pt), (r = dn))
          var u = Pt
          ;((dn = l),
            (Pt = e) && !u ? pn(t, n, (n.subtreeFlags & 8772) !== 0) : mn(t, n),
            (dn = r),
            (Pt = u))
        }
        break
      case 30:
        break
      default:
        mn(t, n)
    }
  }
  function Xh(t) {
    var e = t.alternate
    ;(e !== null && ((t.alternate = null), Xh(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && ns(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null))
  }
  var kt = null,
    ce = !1
  function hn(t, e, n) {
    for (n = n.child; n !== null; ) (Qh(t, e, n), (n = n.sibling))
  }
  function Qh(t, e, n) {
    if (ge && typeof ge.onCommitFiberUnmount == 'function')
      try {
        ge.onCommitFiberUnmount(Ul, n)
      } catch {}
    switch (n.tag) {
      case 26:
        ;(Pt || Je(n, e),
          hn(t, e, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)))
        break
      case 27:
        Pt || Je(n, e)
        var l = kt,
          r = ce
        ;(Vn(n.type) && ((kt = n.stateNode), (ce = !1)),
          hn(t, e, n),
          xi(n.stateNode),
          (kt = l),
          (ce = r))
        break
      case 5:
        Pt || Je(n, e)
      case 6:
        if (
          ((l = kt),
          (r = ce),
          (kt = null),
          hn(t, e, n),
          (kt = l),
          (ce = r),
          kt !== null)
        )
          if (ce)
            try {
              ;(kt.nodeType === 9
                ? kt.body
                : kt.nodeName === 'HTML'
                  ? kt.ownerDocument.body
                  : kt
              ).removeChild(n.stateNode)
            } catch (u) {
              Ot(n, e, u)
            }
          else
            try {
              kt.removeChild(n.stateNode)
            } catch (u) {
              Ot(n, e, u)
            }
        break
      case 18:
        kt !== null &&
          (ce
            ? ((t = kt),
              Bm(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === 'HTML'
                    ? t.ownerDocument.body
                    : t,
                n.stateNode,
              ),
              pl(t))
            : Bm(kt, n.stateNode))
        break
      case 4:
        ;((l = kt),
          (r = ce),
          (kt = n.stateNode.containerInfo),
          (ce = !0),
          hn(t, e, n),
          (kt = l),
          (ce = r))
        break
      case 0:
      case 11:
      case 14:
      case 15:
        ;(Un(2, n, e), Pt || Un(4, n, e), hn(t, e, n))
        break
      case 1:
        ;(Pt ||
          (Je(n, e),
          (l = n.stateNode),
          typeof l.componentWillUnmount == 'function' && Hh(n, e, l)),
          hn(t, e, n))
        break
      case 21:
        hn(t, e, n)
        break
      case 22:
        ;((Pt = (l = Pt) || n.memoizedState !== null), hn(t, e, n), (Pt = l))
        break
      default:
        hn(t, e, n)
    }
  }
  function Zh(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated
      try {
        pl(t)
      } catch (n) {
        Ot(e, e.return, n)
      }
    }
  }
  function Kh(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        pl(t)
      } catch (n) {
        Ot(e, e.return, n)
      }
  }
  function Zy(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode
        return (e === null && (e = t.stateNode = new Gh()), e)
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new Gh()),
          e
        )
      default:
        throw Error(s(435, t.tag))
    }
  }
  function qo(t, e) {
    var n = Zy(t)
    e.forEach(function (l) {
      if (!n.has(l)) {
        n.add(l)
        var r = e0.bind(null, t, l)
        l.then(r, r)
      }
    })
  }
  function fe(t, e) {
    var n = e.deletions
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var r = n[l],
          u = t,
          d = e,
          y = d
        t: for (; y !== null; ) {
          switch (y.tag) {
            case 27:
              if (Vn(y.type)) {
                ;((kt = y.stateNode), (ce = !1))
                break t
              }
              break
            case 5:
              ;((kt = y.stateNode), (ce = !1))
              break t
            case 3:
            case 4:
              ;((kt = y.stateNode.containerInfo), (ce = !0))
              break t
          }
          y = y.return
        }
        if (kt === null) throw Error(s(160))
        ;(Qh(u, d, r),
          (kt = null),
          (ce = !1),
          (u = r.alternate),
          u !== null && (u.return = null),
          (r.return = null))
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; ) (Ph(e, t), (e = e.sibling))
  }
  var Ge = null
  function Ph(t, e) {
    var n = t.alternate,
      l = t.flags
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ;(fe(e, t),
          de(t),
          l & 4 && (Un(3, t, t.return), fi(3, t), Un(5, t, t.return)))
        break
      case 1:
        ;(fe(e, t),
          de(t),
          l & 512 && (Pt || n === null || Je(n, n.return)),
          l & 64 &&
            dn &&
            ((t = t.updateQueue),
            t !== null &&
              ((l = t.callbacks),
              l !== null &&
                ((n = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = n === null ? l : n.concat(l))))))
        break
      case 26:
        var r = Ge
        if (
          (fe(e, t),
          de(t),
          l & 512 && (Pt || n === null || Je(n, n.return)),
          l & 4)
        ) {
          var u = n !== null ? n.memoizedState : null
          if (((l = t.memoizedState), n === null))
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  ;((l = t.type),
                    (n = t.memoizedProps),
                    (r = r.ownerDocument || r))
                  e: switch (l) {
                    case 'title':
                      ;((u = r.getElementsByTagName('title')[0]),
                        (!u ||
                          u[kl] ||
                          u[It] ||
                          u.namespaceURI === 'http://www.w3.org/2000/svg' ||
                          u.hasAttribute('itemprop')) &&
                          ((u = r.createElement(l)),
                          r.head.insertBefore(
                            u,
                            r.querySelector('head > title'),
                          )),
                        ae(u, l, n),
                        (u[It] = t),
                        Wt(u),
                        (l = u))
                      break t
                    case 'link':
                      var d = Pm('link', 'href', r).get(l + (n.href || ''))
                      if (d) {
                        for (var y = 0; y < d.length; y++)
                          if (
                            ((u = d[y]),
                            u.getAttribute('href') ===
                              (n.href == null || n.href === ''
                                ? null
                                : n.href) &&
                              u.getAttribute('rel') ===
                                (n.rel == null ? null : n.rel) &&
                              u.getAttribute('title') ===
                                (n.title == null ? null : n.title) &&
                              u.getAttribute('crossorigin') ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            d.splice(y, 1)
                            break e
                          }
                      }
                      ;((u = r.createElement(l)),
                        ae(u, l, n),
                        r.head.appendChild(u))
                      break
                    case 'meta':
                      if (
                        (d = Pm('meta', 'content', r).get(
                          l + (n.content || ''),
                        ))
                      ) {
                        for (y = 0; y < d.length; y++)
                          if (
                            ((u = d[y]),
                            u.getAttribute('content') ===
                              (n.content == null ? null : '' + n.content) &&
                              u.getAttribute('name') ===
                                (n.name == null ? null : n.name) &&
                              u.getAttribute('property') ===
                                (n.property == null ? null : n.property) &&
                              u.getAttribute('http-equiv') ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              u.getAttribute('charset') ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            d.splice(y, 1)
                            break e
                          }
                      }
                      ;((u = r.createElement(l)),
                        ae(u, l, n),
                        r.head.appendChild(u))
                      break
                    default:
                      throw Error(s(468, l))
                  }
                  ;((u[It] = t), Wt(u), (l = u))
                }
                t.stateNode = l
              } else Jm(r, t.type, t.stateNode)
            else t.stateNode = Km(r, l, t.memoizedProps)
          else
            u !== l
              ? (u === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : u.count--,
                l === null
                  ? Jm(r, t.type, t.stateNode)
                  : Km(r, l, t.memoizedProps))
              : l === null &&
                t.stateNode !== null &&
                _u(t, t.memoizedProps, n.memoizedProps)
        }
        break
      case 27:
        ;(fe(e, t),
          de(t),
          l & 512 && (Pt || n === null || Je(n, n.return)),
          n !== null && l & 4 && _u(t, t.memoizedProps, n.memoizedProps))
        break
      case 5:
        if (
          (fe(e, t),
          de(t),
          l & 512 && (Pt || n === null || Je(n, n.return)),
          t.flags & 32)
        ) {
          r = t.stateNode
          try {
            Ha(r, '')
          } catch (I) {
            Ot(t, t.return, I)
          }
        }
        ;(l & 4 &&
          t.stateNode != null &&
          ((r = t.memoizedProps), _u(t, r, n !== null ? n.memoizedProps : r)),
          l & 1024 && (Cu = !0))
        break
      case 6:
        if ((fe(e, t), de(t), l & 4)) {
          if (t.stateNode === null) throw Error(s(162))
          ;((l = t.memoizedProps), (n = t.stateNode))
          try {
            n.nodeValue = l
          } catch (I) {
            Ot(t, t.return, I)
          }
        }
        break
      case 3:
        if (
          ((nr = null),
          (r = Ge),
          (Ge = tr(e.containerInfo)),
          fe(e, t),
          (Ge = r),
          de(t),
          l & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            pl(e.containerInfo)
          } catch (I) {
            Ot(t, t.return, I)
          }
        Cu && ((Cu = !1), Jh(t))
        break
      case 4:
        ;((l = Ge),
          (Ge = tr(t.stateNode.containerInfo)),
          fe(e, t),
          de(t),
          (Ge = l))
        break
      case 12:
        ;(fe(e, t), de(t))
        break
      case 31:
        ;(fe(e, t),
          de(t),
          l & 4 &&
            ((l = t.updateQueue),
            l !== null && ((t.updateQueue = null), qo(t, l))))
        break
      case 13:
        ;(fe(e, t),
          de(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (Go = Tt()),
          l & 4 &&
            ((l = t.updateQueue),
            l !== null && ((t.updateQueue = null), qo(t, l))))
        break
      case 22:
        r = t.memoizedState !== null
        var E = n !== null && n.memoizedState !== null,
          z = dn,
          H = Pt
        if (
          ((dn = z || r),
          (Pt = H || E),
          fe(e, t),
          (Pt = H),
          (dn = z),
          de(t),
          l & 8192)
        )
          t: for (
            e = t.stateNode,
              e._visibility = r ? e._visibility & -2 : e._visibility | 1,
              r && (n === null || E || dn || Pt || ya(t)),
              n = null,
              e = t;
            ;
          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                E = n = e
                try {
                  if (((u = E.stateNode), r))
                    ((d = u.style),
                      typeof d.setProperty == 'function'
                        ? d.setProperty('display', 'none', 'important')
                        : (d.display = 'none'))
                  else {
                    y = E.stateNode
                    var V = E.memoizedProps.style,
                      D =
                        V != null && V.hasOwnProperty('display')
                          ? V.display
                          : null
                    y.style.display =
                      D == null || typeof D == 'boolean' ? '' : ('' + D).trim()
                  }
                } catch (I) {
                  Ot(E, E.return, I)
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                E = e
                try {
                  E.stateNode.nodeValue = r ? '' : E.memoizedProps
                } catch (I) {
                  Ot(E, E.return, I)
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                E = e
                try {
                  var L = E.stateNode
                  r ? Hm(L, !0) : Hm(E.stateNode, !1)
                } catch (I) {
                  Ot(E, E.return, I)
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) ||
                e.memoizedState === null ||
                e === t) &&
              e.child !== null
            ) {
              ;((e.child.return = e), (e = e.child))
              continue
            }
            if (e === t) break t
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t
              ;(n === e && (n = null), (e = e.return))
            }
            ;(n === e && (n = null),
              (e.sibling.return = e.return),
              (e = e.sibling))
          }
        l & 4 &&
          ((l = t.updateQueue),
          l !== null &&
            ((n = l.retryQueue),
            n !== null && ((l.retryQueue = null), qo(t, n))))
        break
      case 19:
        ;(fe(e, t),
          de(t),
          l & 4 &&
            ((l = t.updateQueue),
            l !== null && ((t.updateQueue = null), qo(t, l))))
        break
      case 30:
        break
      case 21:
        break
      default:
        ;(fe(e, t), de(t))
    }
  }
  function de(t) {
    var e = t.flags
    if (e & 2) {
      try {
        for (var n, l = t.return; l !== null; ) {
          if (qh(l)) {
            n = l
            break
          }
          l = l.return
        }
        if (n == null) throw Error(s(160))
        switch (n.tag) {
          case 27:
            var r = n.stateNode,
              u = Ru(t)
            ko(t, u, r)
            break
          case 5:
            var d = n.stateNode
            n.flags & 32 && (Ha(d, ''), (n.flags &= -33))
            var y = Ru(t)
            ko(t, y, d)
            break
          case 3:
          case 4:
            var E = n.stateNode.containerInfo,
              z = Ru(t)
            Tu(t, z, E)
            break
          default:
            throw Error(s(161))
        }
      } catch (H) {
        Ot(t, t.return, H)
      }
      t.flags &= -3
    }
    e & 4096 && (t.flags &= -4097)
  }
  function Jh(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t
        ;(Jh(e),
          e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
          (t = t.sibling))
      }
  }
  function mn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) (Vh(t, e.alternate, e), (e = e.sibling))
  }
  function ya(t) {
    for (t = t.child; t !== null; ) {
      var e = t
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ;(Un(4, e, e.return), ya(e))
          break
        case 1:
          Je(e, e.return)
          var n = e.stateNode
          ;(typeof n.componentWillUnmount == 'function' && Hh(e, e.return, n),
            ya(e))
          break
        case 27:
          xi(e.stateNode)
        case 26:
        case 5:
          ;(Je(e, e.return), ya(e))
          break
        case 22:
          e.memoizedState === null && ya(e)
          break
        case 30:
          ya(e)
          break
        default:
          ya(e)
      }
      t = t.sibling
    }
  }
  function pn(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var l = e.alternate,
        r = t,
        u = e,
        d = u.flags
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ;(pn(r, u, n), fi(4, u))
          break
        case 1:
          if (
            (pn(r, u, n),
            (l = u),
            (r = l.stateNode),
            typeof r.componentDidMount == 'function')
          )
            try {
              r.componentDidMount()
            } catch (z) {
              Ot(l, l.return, z)
            }
          if (((l = u), (r = l.updateQueue), r !== null)) {
            var y = l.stateNode
            try {
              var E = r.shared.hiddenCallbacks
              if (E !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < E.length; r++)
                  Cd(E[r], y)
            } catch (z) {
              Ot(l, l.return, z)
            }
          }
          ;(n && d & 64 && Bh(u), di(u, u.return))
          break
        case 27:
          Yh(u)
        case 26:
        case 5:
          ;(pn(r, u, n), n && l === null && d & 4 && kh(u), di(u, u.return))
          break
        case 12:
          pn(r, u, n)
          break
        case 31:
          ;(pn(r, u, n), n && d & 4 && Zh(r, u))
          break
        case 13:
          ;(pn(r, u, n), n && d & 4 && Kh(r, u))
          break
        case 22:
          ;(u.memoizedState === null && pn(r, u, n), di(u, u.return))
          break
        case 30:
          break
        default:
          pn(r, u, n)
      }
      e = e.sibling
    }
  }
  function Au(t, e) {
    var n = null
    ;(t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (n = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== n && (t != null && t.refCount++, n != null && $l(n)))
  }
  function Mu(t, e) {
    ;((t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && $l(t)))
  }
  function Ve(t, e, n, l) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (Fh(t, e, n, l), (e = e.sibling))
  }
  function Fh(t, e, n, l) {
    var r = e.flags
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ;(Ve(t, e, n, l), r & 2048 && fi(9, e))
        break
      case 1:
        Ve(t, e, n, l)
        break
      case 3:
        ;(Ve(t, e, n, l),
          r & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && $l(t))))
        break
      case 12:
        if (r & 2048) {
          ;(Ve(t, e, n, l), (t = e.stateNode))
          try {
            var u = e.memoizedProps,
              d = u.id,
              y = u.onPostCommit
            typeof y == 'function' &&
              y(
                d,
                e.alternate === null ? 'mount' : 'update',
                t.passiveEffectDuration,
                -0,
              )
          } catch (E) {
            Ot(e, e.return, E)
          }
        } else Ve(t, e, n, l)
        break
      case 31:
        Ve(t, e, n, l)
        break
      case 13:
        Ve(t, e, n, l)
        break
      case 23:
        break
      case 22:
        ;((u = e.stateNode),
          (d = e.alternate),
          e.memoizedState !== null
            ? u._visibility & 2
              ? Ve(t, e, n, l)
              : hi(t, e)
            : u._visibility & 2
              ? Ve(t, e, n, l)
              : ((u._visibility |= 2),
                ll(t, e, n, l, (e.subtreeFlags & 10256) !== 0 || !1)),
          r & 2048 && Au(d, e))
        break
      case 24:
        ;(Ve(t, e, n, l), r & 2048 && Mu(e.alternate, e))
        break
      default:
        Ve(t, e, n, l)
    }
  }
  function ll(t, e, n, l, r) {
    for (
      r = r && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child;
      e !== null;
    ) {
      var u = t,
        d = e,
        y = n,
        E = l,
        z = d.flags
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          ;(ll(u, d, y, E, r), fi(8, d))
          break
        case 23:
          break
        case 22:
          var H = d.stateNode
          ;(d.memoizedState !== null
            ? H._visibility & 2
              ? ll(u, d, y, E, r)
              : hi(u, d)
            : ((H._visibility |= 2), ll(u, d, y, E, r)),
            r && z & 2048 && Au(d.alternate, d))
          break
        case 24:
          ;(ll(u, d, y, E, r), r && z & 2048 && Mu(d.alternate, d))
          break
        default:
          ll(u, d, y, E, r)
      }
      e = e.sibling
    }
  }
  function hi(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t,
          l = e,
          r = l.flags
        switch (l.tag) {
          case 22:
            ;(hi(n, l), r & 2048 && Au(l.alternate, l))
            break
          case 24:
            ;(hi(n, l), r & 2048 && Mu(l.alternate, l))
            break
          default:
            hi(n, l)
        }
        e = e.sibling
      }
  }
  var mi = 8192
  function il(t, e, n) {
    if (t.subtreeFlags & mi)
      for (t = t.child; t !== null; ) (Wh(t, e, n), (t = t.sibling))
  }
  function Wh(t, e, n) {
    switch (t.tag) {
      case 26:
        ;(il(t, e, n),
          t.flags & mi &&
            t.memoizedState !== null &&
            D0(n, Ge, t.memoizedState, t.memoizedProps))
        break
      case 5:
        il(t, e, n)
        break
      case 3:
      case 4:
        var l = Ge
        ;((Ge = tr(t.stateNode.containerInfo)), il(t, e, n), (Ge = l))
        break
      case 22:
        t.memoizedState === null &&
          ((l = t.alternate),
          l !== null && l.memoizedState !== null
            ? ((l = mi), (mi = 16777216), il(t, e, n), (mi = l))
            : il(t, e, n))
        break
      default:
        il(t, e, n)
    }
  }
  function $h(t) {
    var e = t.alternate
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null
      do ((e = t.sibling), (t.sibling = null), (t = e))
      while (t !== null)
    }
  }
  function pi(t) {
    var e = t.deletions
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n]
          ;(($t = l), tm(l, t))
        }
      $h(t)
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (Ih(t), (t = t.sibling))
  }
  function Ih(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ;(pi(t), t.flags & 2048 && Un(9, t, t.return))
        break
      case 3:
        pi(t)
        break
      case 12:
        pi(t)
        break
      case 22:
        var e = t.stateNode
        t.memoizedState !== null &&
        e._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), Yo(t))
          : pi(t)
        break
      default:
        pi(t)
    }
  }
  function Yo(t) {
    var e = t.deletions
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n]
          ;(($t = l), tm(l, t))
        }
      $h(t)
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          ;(Un(8, e, e.return), Yo(e))
          break
        case 22:
          ;((n = e.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), Yo(e)))
          break
        default:
          Yo(e)
      }
      t = t.sibling
    }
  }
  function tm(t, e) {
    for (; $t !== null; ) {
      var n = $t
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Un(8, n, e)
          break
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool
            l != null && l.refCount++
          }
          break
        case 24:
          $l(n.memoizedState.cache)
      }
      if (((l = n.child), l !== null)) ((l.return = n), ($t = l))
      else
        t: for (n = t; $t !== null; ) {
          l = $t
          var r = l.sibling,
            u = l.return
          if ((Xh(l), l === n)) {
            $t = null
            break t
          }
          if (r !== null) {
            ;((r.return = u), ($t = r))
            break t
          }
          $t = u
        }
    }
  }
  var Ky = {
      getCacheForType: function (t) {
        var e = ee(Qt),
          n = e.data.get(t)
        return (n === void 0 && ((n = t()), e.data.set(t, n)), n)
      },
      cacheSignal: function () {
        return ee(Qt).controller.signal
      },
    },
    Py = typeof WeakMap == 'function' ? WeakMap : Map,
    Ct = 0,
    Lt = null,
    mt = null,
    gt = 0,
    Mt = 0,
    _e = null,
    Bn = !1,
    ol = !1,
    Ou = !1,
    vn = 0,
    Gt = 0,
    Hn = 0,
    ba = 0,
    wu = 0,
    Re = 0,
    rl = 0,
    vi = null,
    he = null,
    zu = !1,
    Go = 0,
    em = 0,
    Vo = 1 / 0,
    Xo = null,
    kn = null,
    Jt = 0,
    qn = null,
    sl = null,
    gn = 0,
    Du = 0,
    Nu = null,
    nm = null,
    gi = 0,
    Lu = null
  function Te() {
    return (Ct & 2) !== 0 && gt !== 0 ? gt & -gt : j.T !== null ? qu() : yf()
  }
  function am() {
    if (Re === 0)
      if ((gt & 536870912) === 0 || bt) {
        var t = Wi
        ;((Wi <<= 1), (Wi & 3932160) === 0 && (Wi = 262144), (Re = t))
      } else Re = 536870912
    return ((t = xe.current), t !== null && (t.flags |= 32), Re)
  }
  function me(t, e, n) {
    ;(((t === Lt && (Mt === 2 || Mt === 9)) ||
      t.cancelPendingCommit !== null) &&
      (ul(t, 0), Yn(t, gt, Re, !1)),
      Hl(t, n),
      ((Ct & 2) === 0 || t !== Lt) &&
        (t === Lt &&
          ((Ct & 2) === 0 && (ba |= n), Gt === 4 && Yn(t, gt, Re, !1)),
        Fe(t)))
  }
  function lm(t, e, n) {
    if ((Ct & 6) !== 0) throw Error(s(327))
    var l = (!n && (e & 127) === 0 && (e & t.expiredLanes) === 0) || Bl(t, e),
      r = l ? Wy(t, e) : Uu(t, e, !0),
      u = l
    do {
      if (r === 0) {
        ol && !l && Yn(t, e, 0, !1)
        break
      } else {
        if (((n = t.current.alternate), u && !Jy(n))) {
          ;((r = Uu(t, e, !1)), (u = !1))
          continue
        }
        if (r === 2) {
          if (((u = e), t.errorRecoveryDisabledLanes & u)) var d = 0
          else
            ((d = t.pendingLanes & -536870913),
              (d = d !== 0 ? d : d & 536870912 ? 536870912 : 0))
          if (d !== 0) {
            e = d
            t: {
              var y = t
              r = vi
              var E = y.current.memoizedState.isDehydrated
              if ((E && (ul(y, d).flags |= 256), (d = Uu(y, d, !1)), d !== 2)) {
                if (Ou && !E) {
                  ;((y.errorRecoveryDisabledLanes |= u), (ba |= u), (r = 4))
                  break t
                }
                ;((u = he),
                  (he = r),
                  u !== null && (he === null ? (he = u) : he.push.apply(he, u)))
              }
              r = d
            }
            if (((u = !1), r !== 2)) continue
          }
        }
        if (r === 1) {
          ;(ul(t, 0), Yn(t, e, 0, !0))
          break
        }
        t: {
          switch (((l = t), (u = r), u)) {
            case 0:
            case 1:
              throw Error(s(345))
            case 4:
              if ((e & 4194048) !== e) break
            case 6:
              Yn(l, e, Re, !Bn)
              break t
            case 2:
              he = null
              break
            case 3:
            case 5:
              break
            default:
              throw Error(s(329))
          }
          if ((e & 62914560) === e && ((r = Go + 300 - Tt()), 10 < r)) {
            if ((Yn(l, e, Re, !Bn), Ii(l, 0, !0) !== 0)) break t
            ;((gn = e),
              (l.timeoutHandle = jm(
                im.bind(
                  null,
                  l,
                  n,
                  he,
                  Xo,
                  zu,
                  e,
                  Re,
                  ba,
                  rl,
                  Bn,
                  u,
                  'Throttled',
                  -0,
                  0,
                ),
                r,
              )))
            break t
          }
          im(l, n, he, Xo, zu, e, Re, ba, rl, Bn, u, null, -0, 0)
        }
      }
      break
    } while (!0)
    Fe(t)
  }
  function im(t, e, n, l, r, u, d, y, E, z, H, V, D, L) {
    if (
      ((t.timeoutHandle = -1),
      (V = e.subtreeFlags),
      V & 8192 || (V & 16785408) === 16785408)
    ) {
      ;((V = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: en,
      }),
        Wh(e, u, V))
      var I =
        (u & 62914560) === u ? Go - Tt() : (u & 4194048) === u ? em - Tt() : 0
      if (((I = N0(V, I)), I !== null)) {
        ;((gn = u),
          (t.cancelPendingCommit = I(
            hm.bind(null, t, e, u, n, l, r, d, y, E, H, V, null, D, L),
          )),
          Yn(t, u, d, !z))
        return
      }
    }
    hm(t, e, u, n, l, r, d, y, E)
  }
  function Jy(t) {
    for (var e = t; ; ) {
      var n = e.tag
      if (
        (n === 0 || n === 11 || n === 15) &&
        e.flags & 16384 &&
        ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var l = 0; l < n.length; l++) {
          var r = n[l],
            u = r.getSnapshot
          r = r.value
          try {
            if (!be(u(), r)) return !1
          } catch {
            return !1
          }
        }
      if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
        ((n.return = e), (e = n))
      else {
        if (e === t) break
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0
          e = e.return
        }
        ;((e.sibling.return = e.return), (e = e.sibling))
      }
    }
    return !0
  }
  function Yn(t, e, n, l) {
    ;((e &= ~wu),
      (e &= ~ba),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      l && (t.warmLanes |= e),
      (l = t.expirationTimes))
    for (var r = e; 0 < r; ) {
      var u = 31 - ye(r),
        d = 1 << u
      ;((l[u] = -1), (r &= ~d))
    }
    n !== 0 && pf(t, n, e)
  }
  function Qo() {
    return (Ct & 6) === 0 ? (yi(0), !1) : !0
  }
  function ju() {
    if (mt !== null) {
      if (Mt === 0) var t = mt.return
      else ((t = mt), (on = ca = null), Ws(t), (Ia = null), (ti = 0), (t = mt))
      for (; t !== null; ) (Uh(t.alternate, t), (t = t.return))
      mt = null
    }
  }
  function ul(t, e) {
    var n = t.timeoutHandle
    ;(n !== -1 && ((t.timeoutHandle = -1), p0(n)),
      (n = t.cancelPendingCommit),
      n !== null && ((t.cancelPendingCommit = null), n()),
      (gn = 0),
      ju(),
      (Lt = t),
      (mt = n = an(t.current, null)),
      (gt = e),
      (Mt = 0),
      (_e = null),
      (Bn = !1),
      (ol = Bl(t, e)),
      (Ou = !1),
      (rl = Re = wu = ba = Hn = Gt = 0),
      (he = vi = null),
      (zu = !1),
      (e & 8) !== 0 && (e |= e & 32))
    var l = t.entangledLanes
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var r = 31 - ye(l),
          u = 1 << r
        ;((e |= t[r]), (l &= ~u))
      }
    return ((vn = e), fo(), n)
  }
  function om(t, e) {
    ;((ft = null),
      (j.H = si),
      e === $a || e === So
        ? ((e = Ed()), (Mt = 3))
        : e === ks
          ? ((e = Ed()), (Mt = 4))
          : (Mt =
              e === hu
                ? 8
                : e !== null &&
                    typeof e == 'object' &&
                    typeof e.then == 'function'
                  ? 6
                  : 1),
      (_e = e),
      mt === null && ((Gt = 1), Lo(t, De(e, t.current))))
  }
  function rm() {
    var t = xe.current
    return t === null
      ? !0
      : (gt & 4194048) === gt
        ? Ue === null
        : (gt & 62914560) === gt || (gt & 536870912) !== 0
          ? t === Ue
          : !1
  }
  function sm() {
    var t = j.H
    return ((j.H = si), t === null ? si : t)
  }
  function um() {
    var t = j.A
    return ((j.A = Ky), t)
  }
  function Zo() {
    ;((Gt = 4),
      Bn || ((gt & 4194048) !== gt && xe.current !== null) || (ol = !0),
      ((Hn & 134217727) === 0 && (ba & 134217727) === 0) ||
        Lt === null ||
        Yn(Lt, gt, Re, !1))
  }
  function Uu(t, e, n) {
    var l = Ct
    Ct |= 2
    var r = sm(),
      u = um()
    ;((Lt !== t || gt !== e) && ((Xo = null), ul(t, e)), (e = !1))
    var d = Gt
    t: do
      try {
        if (Mt !== 0 && mt !== null) {
          var y = mt,
            E = _e
          switch (Mt) {
            case 8:
              ;(ju(), (d = 6))
              break t
            case 3:
            case 2:
            case 9:
            case 6:
              xe.current === null && (e = !0)
              var z = Mt
              if (((Mt = 0), (_e = null), cl(t, y, E, z), n && ol)) {
                d = 0
                break t
              }
              break
            default:
              ;((z = Mt), (Mt = 0), (_e = null), cl(t, y, E, z))
          }
        }
        ;(Fy(), (d = Gt))
        break
      } catch (H) {
        om(t, H)
      }
    while (!0)
    return (
      e && t.shellSuspendCounter++,
      (on = ca = null),
      (Ct = l),
      (j.H = r),
      (j.A = u),
      mt === null && ((Lt = null), (gt = 0), fo()),
      d
    )
  }
  function Fy() {
    for (; mt !== null; ) cm(mt)
  }
  function Wy(t, e) {
    var n = Ct
    Ct |= 2
    var l = sm(),
      r = um()
    Lt !== t || gt !== e
      ? ((Xo = null), (Vo = Tt() + 500), ul(t, e))
      : (ol = Bl(t, e))
    t: do
      try {
        if (Mt !== 0 && mt !== null) {
          e = mt
          var u = _e
          e: switch (Mt) {
            case 1:
              ;((Mt = 0), (_e = null), cl(t, e, u, 1))
              break
            case 2:
            case 9:
              if (Sd(u)) {
                ;((Mt = 0), (_e = null), fm(e))
                break
              }
              ;((e = function () {
                ;((Mt !== 2 && Mt !== 9) || Lt !== t || (Mt = 7), Fe(t))
              }),
                u.then(e, e))
              break t
            case 3:
              Mt = 7
              break t
            case 4:
              Mt = 5
              break t
            case 7:
              Sd(u)
                ? ((Mt = 0), (_e = null), fm(e))
                : ((Mt = 0), (_e = null), cl(t, e, u, 7))
              break
            case 5:
              var d = null
              switch (mt.tag) {
                case 26:
                  d = mt.memoizedState
                case 5:
                case 27:
                  var y = mt
                  if (d ? Fm(d) : y.stateNode.complete) {
                    ;((Mt = 0), (_e = null))
                    var E = y.sibling
                    if (E !== null) mt = E
                    else {
                      var z = y.return
                      z !== null ? ((mt = z), Ko(z)) : (mt = null)
                    }
                    break e
                  }
              }
              ;((Mt = 0), (_e = null), cl(t, e, u, 5))
              break
            case 6:
              ;((Mt = 0), (_e = null), cl(t, e, u, 6))
              break
            case 8:
              ;(ju(), (Gt = 6))
              break t
            default:
              throw Error(s(462))
          }
        }
        $y()
        break
      } catch (H) {
        om(t, H)
      }
    while (!0)
    return (
      (on = ca = null),
      (j.H = l),
      (j.A = r),
      (Ct = n),
      mt !== null ? 0 : ((Lt = null), (gt = 0), fo(), Gt)
    )
  }
  function $y() {
    for (; mt !== null && !Pi(); ) cm(mt)
  }
  function cm(t) {
    var e = Lh(t.alternate, t, vn)
    ;((t.memoizedProps = t.pendingProps), e === null ? Ko(t) : (mt = e))
  }
  function fm(t) {
    var e = t,
      n = e.alternate
    switch (e.tag) {
      case 15:
      case 0:
        e = Mh(n, e, e.pendingProps, e.type, void 0, gt)
        break
      case 11:
        e = Mh(n, e, e.pendingProps, e.type.render, e.ref, gt)
        break
      case 5:
        Ws(e)
      default:
        ;(Uh(n, e), (e = mt = ud(e, vn)), (e = Lh(n, e, vn)))
    }
    ;((t.memoizedProps = t.pendingProps), e === null ? Ko(t) : (mt = e))
  }
  function cl(t, e, n, l) {
    ;((on = ca = null), Ws(e), (Ia = null), (ti = 0))
    var r = e.return
    try {
      if (qy(t, r, e, n, gt)) {
        ;((Gt = 1), Lo(t, De(n, t.current)), (mt = null))
        return
      }
    } catch (u) {
      if (r !== null) throw ((mt = r), u)
      ;((Gt = 1), Lo(t, De(n, t.current)), (mt = null))
      return
    }
    e.flags & 32768
      ? (bt || l === 1
          ? (t = !0)
          : ol || (gt & 536870912) !== 0
            ? (t = !1)
            : ((Bn = t = !0),
              (l === 2 || l === 9 || l === 3 || l === 6) &&
                ((l = xe.current),
                l !== null && l.tag === 13 && (l.flags |= 16384))),
        dm(e, t))
      : Ko(e)
  }
  function Ko(t) {
    var e = t
    do {
      if ((e.flags & 32768) !== 0) {
        dm(e, Bn)
        return
      }
      t = e.return
      var n = Vy(e.alternate, e, vn)
      if (n !== null) {
        mt = n
        return
      }
      if (((e = e.sibling), e !== null)) {
        mt = e
        return
      }
      mt = e = t
    } while (e !== null)
    Gt === 0 && (Gt = 5)
  }
  function dm(t, e) {
    do {
      var n = Xy(t.alternate, t)
      if (n !== null) {
        ;((n.flags &= 32767), (mt = n))
        return
      }
      if (
        ((n = t.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        mt = t
        return
      }
      mt = t = n
    } while (t !== null)
    ;((Gt = 6), (mt = null))
  }
  function hm(t, e, n, l, r, u, d, y, E) {
    t.cancelPendingCommit = null
    do Po()
    while (Jt !== 0)
    if ((Ct & 6) !== 0) throw Error(s(327))
    if (e !== null) {
      if (e === t.current) throw Error(s(177))
      if (
        ((u = e.lanes | e.childLanes),
        (u |= Rs),
        zg(t, n, u, d, y, E),
        t === Lt && ((mt = Lt = null), (gt = 0)),
        (sl = e),
        (qn = t),
        (gn = n),
        (Du = u),
        (Nu = r),
        (nm = l),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            n0(Ji, function () {
              return (ym(), null)
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (l = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || l)
      ) {
        ;((l = j.T), (j.T = null), (r = J.p), (J.p = 2), (d = Ct), (Ct |= 4))
        try {
          Qy(t, e, n)
        } finally {
          ;((Ct = d), (J.p = r), (j.T = l))
        }
      }
      ;((Jt = 1), mm(), pm(), vm())
    }
  }
  function mm() {
    if (Jt === 1) {
      Jt = 0
      var t = qn,
        e = sl,
        n = (e.flags & 13878) !== 0
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        ;((n = j.T), (j.T = null))
        var l = J.p
        J.p = 2
        var r = Ct
        Ct |= 4
        try {
          Ph(e, t)
          var u = Pu,
            d = td(t.containerInfo),
            y = u.focusedElem,
            E = u.selectionRange
          if (
            d !== y &&
            y &&
            y.ownerDocument &&
            If(y.ownerDocument.documentElement, y)
          ) {
            if (E !== null && bs(y)) {
              var z = E.start,
                H = E.end
              if ((H === void 0 && (H = z), 'selectionStart' in y))
                ((y.selectionStart = z),
                  (y.selectionEnd = Math.min(H, y.value.length)))
              else {
                var V = y.ownerDocument || document,
                  D = (V && V.defaultView) || window
                if (D.getSelection) {
                  var L = D.getSelection(),
                    I = y.textContent.length,
                    ot = Math.min(E.start, I),
                    Nt = E.end === void 0 ? ot : Math.min(E.end, I)
                  !L.extend && ot > Nt && ((d = Nt), (Nt = ot), (ot = d))
                  var A = $f(y, ot),
                    R = $f(y, Nt)
                  if (
                    A &&
                    R &&
                    (L.rangeCount !== 1 ||
                      L.anchorNode !== A.node ||
                      L.anchorOffset !== A.offset ||
                      L.focusNode !== R.node ||
                      L.focusOffset !== R.offset)
                  ) {
                    var w = V.createRange()
                    ;(w.setStart(A.node, A.offset),
                      L.removeAllRanges(),
                      ot > Nt
                        ? (L.addRange(w), L.extend(R.node, R.offset))
                        : (w.setEnd(R.node, R.offset), L.addRange(w)))
                  }
                }
              }
            }
            for (V = [], L = y; (L = L.parentNode); )
              L.nodeType === 1 &&
                V.push({ element: L, left: L.scrollLeft, top: L.scrollTop })
            for (
              typeof y.focus == 'function' && y.focus(), y = 0;
              y < V.length;
              y++
            ) {
              var k = V[y]
              ;((k.element.scrollLeft = k.left), (k.element.scrollTop = k.top))
            }
          }
          ;((or = !!Ku), (Pu = Ku = null))
        } finally {
          ;((Ct = r), (J.p = l), (j.T = n))
        }
      }
      ;((t.current = e), (Jt = 2))
    }
  }
  function pm() {
    if (Jt === 2) {
      Jt = 0
      var t = qn,
        e = sl,
        n = (e.flags & 8772) !== 0
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        ;((n = j.T), (j.T = null))
        var l = J.p
        J.p = 2
        var r = Ct
        Ct |= 4
        try {
          Vh(t, e.alternate, e)
        } finally {
          ;((Ct = r), (J.p = l), (j.T = n))
        }
      }
      Jt = 3
    }
  }
  function vm() {
    if (Jt === 4 || Jt === 3) {
      ;((Jt = 0), wt())
      var t = qn,
        e = sl,
        n = gn,
        l = nm
      ;(e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (Jt = 5)
        : ((Jt = 0), (sl = qn = null), gm(t, t.pendingLanes))
      var r = t.pendingLanes
      if (
        (r === 0 && (kn = null),
        ts(n),
        (e = e.stateNode),
        ge && typeof ge.onCommitFiberRoot == 'function')
      )
        try {
          ge.onCommitFiberRoot(Ul, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
      if (l !== null) {
        ;((e = j.T), (r = J.p), (J.p = 2), (j.T = null))
        try {
          for (var u = t.onRecoverableError, d = 0; d < l.length; d++) {
            var y = l[d]
            u(y.value, { componentStack: y.stack })
          }
        } finally {
          ;((j.T = e), (J.p = r))
        }
      }
      ;((gn & 3) !== 0 && Po(),
        Fe(t),
        (r = t.pendingLanes),
        (n & 261930) !== 0 && (r & 42) !== 0
          ? t === Lu
            ? gi++
            : ((gi = 0), (Lu = t))
          : (gi = 0),
        yi(0))
    }
  }
  function gm(t, e) {
    ;(t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), $l(e)))
  }
  function Po() {
    return (mm(), pm(), vm(), ym())
  }
  function ym() {
    if (Jt !== 5) return !1
    var t = qn,
      e = Du
    Du = 0
    var n = ts(gn),
      l = j.T,
      r = J.p
    try {
      ;((J.p = 32 > n ? 32 : n), (j.T = null), (n = Nu), (Nu = null))
      var u = qn,
        d = gn
      if (((Jt = 0), (sl = qn = null), (gn = 0), (Ct & 6) !== 0))
        throw Error(s(331))
      var y = Ct
      if (
        ((Ct |= 4),
        Ih(u.current),
        Fh(u, u.current, d, n),
        (Ct = y),
        yi(0, !1),
        ge && typeof ge.onPostCommitFiberRoot == 'function')
      )
        try {
          ge.onPostCommitFiberRoot(Ul, u)
        } catch {}
      return !0
    } finally {
      ;((J.p = r), (j.T = l), gm(t, e))
    }
  }
  function bm(t, e, n) {
    ;((e = De(n, e)),
      (e = du(t.stateNode, e, 2)),
      (t = Nn(t, e, 2)),
      t !== null && (Hl(t, 2), Fe(t)))
  }
  function Ot(t, e, n) {
    if (t.tag === 3) bm(t, t, n)
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          bm(e, t, n)
          break
        } else if (e.tag === 1) {
          var l = e.stateNode
          if (
            typeof e.type.getDerivedStateFromError == 'function' ||
            (typeof l.componentDidCatch == 'function' &&
              (kn === null || !kn.has(l)))
          ) {
            ;((t = De(n, t)),
              (n = Sh(2)),
              (l = Nn(e, n, 2)),
              l !== null && (xh(n, l, e, t), Hl(l, 2), Fe(l)))
            break
          }
        }
        e = e.return
      }
  }
  function Bu(t, e, n) {
    var l = t.pingCache
    if (l === null) {
      l = t.pingCache = new Py()
      var r = new Set()
      l.set(e, r)
    } else ((r = l.get(e)), r === void 0 && ((r = new Set()), l.set(e, r)))
    r.has(n) ||
      ((Ou = !0), r.add(n), (t = Iy.bind(null, t, e, n)), e.then(t, t))
  }
  function Iy(t, e, n) {
    var l = t.pingCache
    ;(l !== null && l.delete(e),
      (t.pingedLanes |= t.suspendedLanes & n),
      (t.warmLanes &= ~n),
      Lt === t &&
        (gt & n) === n &&
        (Gt === 4 || (Gt === 3 && (gt & 62914560) === gt && 300 > Tt() - Go)
          ? (Ct & 2) === 0 && ul(t, 0)
          : (wu |= n),
        rl === gt && (rl = 0)),
      Fe(t))
  }
  function Sm(t, e) {
    ;(e === 0 && (e = mf()), (t = ra(t, e)), t !== null && (Hl(t, e), Fe(t)))
  }
  function t0(t) {
    var e = t.memoizedState,
      n = 0
    ;(e !== null && (n = e.retryLane), Sm(t, n))
  }
  function e0(t, e) {
    var n = 0
    switch (t.tag) {
      case 31:
      case 13:
        var l = t.stateNode,
          r = t.memoizedState
        r !== null && (n = r.retryLane)
        break
      case 19:
        l = t.stateNode
        break
      case 22:
        l = t.stateNode._retryCache
        break
      default:
        throw Error(s(314))
    }
    ;(l !== null && l.delete(e), Sm(t, n))
  }
  function n0(t, e) {
    return _n(t, e)
  }
  var Jo = null,
    fl = null,
    Hu = !1,
    Fo = !1,
    ku = !1,
    Gn = 0
  function Fe(t) {
    ;(t !== fl &&
      t.next === null &&
      (fl === null ? (Jo = fl = t) : (fl = fl.next = t)),
      (Fo = !0),
      Hu || ((Hu = !0), l0()))
  }
  function yi(t, e) {
    if (!ku && Fo) {
      ku = !0
      do
        for (var n = !1, l = Jo; l !== null; ) {
          if (t !== 0) {
            var r = l.pendingLanes
            if (r === 0) var u = 0
            else {
              var d = l.suspendedLanes,
                y = l.pingedLanes
              ;((u = (1 << (31 - ye(42 | t) + 1)) - 1),
                (u &= r & ~(d & ~y)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0))
            }
            u !== 0 && ((n = !0), Rm(l, u))
          } else
            ((u = gt),
              (u = Ii(
                l,
                l === Lt ? u : 0,
                l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
              )),
              (u & 3) === 0 || Bl(l, u) || ((n = !0), Rm(l, u)))
          l = l.next
        }
      while (n)
      ku = !1
    }
  }
  function a0() {
    xm()
  }
  function xm() {
    Fo = Hu = !1
    var t = 0
    Gn !== 0 && m0() && (t = Gn)
    for (var e = Tt(), n = null, l = Jo; l !== null; ) {
      var r = l.next,
        u = Em(l, e)
      ;(u === 0
        ? ((l.next = null),
          n === null ? (Jo = r) : (n.next = r),
          r === null && (fl = n))
        : ((n = l), (t !== 0 || (u & 3) !== 0) && (Fo = !0)),
        (l = r))
    }
    ;((Jt !== 0 && Jt !== 5) || yi(t), Gn !== 0 && (Gn = 0))
  }
  function Em(t, e) {
    for (
      var n = t.suspendedLanes,
        l = t.pingedLanes,
        r = t.expirationTimes,
        u = t.pendingLanes & -62914561;
      0 < u;
    ) {
      var d = 31 - ye(u),
        y = 1 << d,
        E = r[d]
      ;(E === -1
        ? ((y & n) === 0 || (y & l) !== 0) && (r[d] = wg(y, e))
        : E <= e && (t.expiredLanes |= y),
        (u &= ~y))
    }
    if (
      ((e = Lt),
      (n = gt),
      (n = Ii(
        t,
        t === e ? n : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      (l = t.callbackNode),
      n === 0 ||
        (t === e && (Mt === 2 || Mt === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        l !== null && l !== null && za(l),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      )
    if ((n & 3) === 0 || Bl(t, n)) {
      if (((e = n & -n), e === t.callbackPriority)) return e
      switch ((l !== null && za(l), ts(n))) {
        case 2:
        case 8:
          n = df
          break
        case 32:
          n = Ji
          break
        case 268435456:
          n = hf
          break
        default:
          n = Ji
      }
      return (
        (l = _m.bind(null, t)),
        (n = _n(n, l)),
        (t.callbackPriority = e),
        (t.callbackNode = n),
        e
      )
    }
    return (
      l !== null && l !== null && za(l),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    )
  }
  function _m(t, e) {
    if (Jt !== 0 && Jt !== 5)
      return ((t.callbackNode = null), (t.callbackPriority = 0), null)
    var n = t.callbackNode
    if (Po() && t.callbackNode !== n) return null
    var l = gt
    return (
      (l = Ii(
        t,
        t === Lt ? l : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1,
      )),
      l === 0
        ? null
        : (lm(t, l, e),
          Em(t, Tt()),
          t.callbackNode != null && t.callbackNode === n
            ? _m.bind(null, t)
            : null)
    )
  }
  function Rm(t, e) {
    if (Po()) return null
    lm(t, e, !0)
  }
  function l0() {
    v0(function () {
      ;(Ct & 6) !== 0 ? _n(jl, a0) : xm()
    })
  }
  function qu() {
    if (Gn === 0) {
      var t = Fa
      ;(t === 0 && ((t = Fi), (Fi <<= 1), (Fi & 261888) === 0 && (Fi = 256)),
        (Gn = t))
    }
    return Gn
  }
  function Tm(t) {
    return t == null || typeof t == 'symbol' || typeof t == 'boolean'
      ? null
      : typeof t == 'function'
        ? t
        : ao('' + t)
  }
  function Cm(t, e) {
    var n = e.ownerDocument.createElement('input')
    return (
      (n.name = e.name),
      (n.value = e.value),
      t.id && n.setAttribute('form', t.id),
      e.parentNode.insertBefore(n, e),
      (t = new FormData(t)),
      n.parentNode.removeChild(n),
      t
    )
  }
  function i0(t, e, n, l, r) {
    if (e === 'submit' && n && n.stateNode === r) {
      var u = Tm((r[se] || null).action),
        d = l.submitter
      d &&
        ((e = (e = d[se] || null)
          ? Tm(e.formAction)
          : d.getAttribute('formAction')),
        e !== null && ((u = e), (d = null)))
      var y = new ro('action', 'action', null, l, r)
      t.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (l.defaultPrevented) {
                if (Gn !== 0) {
                  var E = d ? Cm(r, d) : new FormData(r)
                  ou(
                    n,
                    { pending: !0, data: E, method: r.method, action: u },
                    null,
                    E,
                  )
                }
              } else
                typeof u == 'function' &&
                  (y.preventDefault(),
                  (E = d ? Cm(r, d) : new FormData(r)),
                  ou(
                    n,
                    { pending: !0, data: E, method: r.method, action: u },
                    u,
                    E,
                  ))
            },
            currentTarget: r,
          },
        ],
      })
    }
  }
  for (var Yu = 0; Yu < _s.length; Yu++) {
    var Gu = _s[Yu],
      o0 = Gu.toLowerCase(),
      r0 = Gu[0].toUpperCase() + Gu.slice(1)
    Ye(o0, 'on' + r0)
  }
  ;(Ye(ad, 'onAnimationEnd'),
    Ye(ld, 'onAnimationIteration'),
    Ye(id, 'onAnimationStart'),
    Ye('dblclick', 'onDoubleClick'),
    Ye('focusin', 'onFocus'),
    Ye('focusout', 'onBlur'),
    Ye(_y, 'onTransitionRun'),
    Ye(Ry, 'onTransitionStart'),
    Ye(Ty, 'onTransitionCancel'),
    Ye(od, 'onTransitionEnd'),
    Ua('onMouseEnter', ['mouseout', 'mouseover']),
    Ua('onMouseLeave', ['mouseout', 'mouseover']),
    Ua('onPointerEnter', ['pointerout', 'pointerover']),
    Ua('onPointerLeave', ['pointerout', 'pointerover']),
    aa(
      'onChange',
      'change click focusin focusout input keydown keyup selectionchange'.split(
        ' ',
      ),
    ),
    aa(
      'onSelect',
      'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
        ' ',
      ),
    ),
    aa('onBeforeInput', ['compositionend', 'keypress', 'textInput', 'paste']),
    aa(
      'onCompositionEnd',
      'compositionend focusout keydown keypress keyup mousedown'.split(' '),
    ),
    aa(
      'onCompositionStart',
      'compositionstart focusout keydown keypress keyup mousedown'.split(' '),
    ),
    aa(
      'onCompositionUpdate',
      'compositionupdate focusout keydown keypress keyup mousedown'.split(' '),
    ))
  var bi =
      'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' ',
      ),
    s0 = new Set(
      'beforetoggle cancel close invalid load scroll scrollend toggle'
        .split(' ')
        .concat(bi),
    )
  function Am(t, e) {
    e = (e & 4) !== 0
    for (var n = 0; n < t.length; n++) {
      var l = t[n],
        r = l.event
      l = l.listeners
      t: {
        var u = void 0
        if (e)
          for (var d = l.length - 1; 0 <= d; d--) {
            var y = l[d],
              E = y.instance,
              z = y.currentTarget
            if (((y = y.listener), E !== u && r.isPropagationStopped())) break t
            ;((u = y), (r.currentTarget = z))
            try {
              u(r)
            } catch (H) {
              co(H)
            }
            ;((r.currentTarget = null), (u = E))
          }
        else
          for (d = 0; d < l.length; d++) {
            if (
              ((y = l[d]),
              (E = y.instance),
              (z = y.currentTarget),
              (y = y.listener),
              E !== u && r.isPropagationStopped())
            )
              break t
            ;((u = y), (r.currentTarget = z))
            try {
              u(r)
            } catch (H) {
              co(H)
            }
            ;((r.currentTarget = null), (u = E))
          }
      }
    }
  }
  function pt(t, e) {
    var n = e[es]
    n === void 0 && (n = e[es] = new Set())
    var l = t + '__bubble'
    n.has(l) || (Mm(e, t, 2, !1), n.add(l))
  }
  function Vu(t, e, n) {
    var l = 0
    ;(e && (l |= 4), Mm(n, t, l, e))
  }
  var Wo = '_reactListening' + Math.random().toString(36).slice(2)
  function Xu(t) {
    if (!t[Wo]) {
      ;((t[Wo] = !0),
        xf.forEach(function (n) {
          n !== 'selectionchange' && (s0.has(n) || Vu(n, !1, t), Vu(n, !0, t))
        }))
      var e = t.nodeType === 9 ? t : t.ownerDocument
      e === null || e[Wo] || ((e[Wo] = !0), Vu('selectionchange', !1, e))
    }
  }
  function Mm(t, e, n, l) {
    switch (ap(e)) {
      case 2:
        var r = U0
        break
      case 8:
        r = B0
        break
      default:
        r = ic
    }
    ;((n = r.bind(null, e, n, t)),
      (r = void 0),
      !cs ||
        (e !== 'touchstart' && e !== 'touchmove' && e !== 'wheel') ||
        (r = !0),
      l
        ? r !== void 0
          ? t.addEventListener(e, n, { capture: !0, passive: r })
          : t.addEventListener(e, n, !0)
        : r !== void 0
          ? t.addEventListener(e, n, { passive: r })
          : t.addEventListener(e, n, !1))
  }
  function Qu(t, e, n, l, r) {
    var u = l
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (;;) {
        if (l === null) return
        var d = l.tag
        if (d === 3 || d === 4) {
          var y = l.stateNode.containerInfo
          if (y === r) break
          if (d === 4)
            for (d = l.return; d !== null; ) {
              var E = d.tag
              if ((E === 3 || E === 4) && d.stateNode.containerInfo === r)
                return
              d = d.return
            }
          for (; y !== null; ) {
            if (((d = Na(y)), d === null)) return
            if (((E = d.tag), E === 5 || E === 6 || E === 26 || E === 27)) {
              l = u = d
              continue t
            }
            y = y.parentNode
          }
        }
        l = l.return
      }
    Nf(function () {
      var z = u,
        H = ss(n),
        V = []
      t: {
        var D = rd.get(t)
        if (D !== void 0) {
          var L = ro,
            I = t
          switch (t) {
            case 'keypress':
              if (io(n) === 0) break t
            case 'keydown':
            case 'keyup':
              L = ey
              break
            case 'focusin':
              ;((I = 'focus'), (L = ms))
              break
            case 'focusout':
              ;((I = 'blur'), (L = ms))
              break
            case 'beforeblur':
            case 'afterblur':
              L = ms
              break
            case 'click':
              if (n.button === 2) break t
            case 'auxclick':
            case 'dblclick':
            case 'mousedown':
            case 'mousemove':
            case 'mouseup':
            case 'mouseout':
            case 'mouseover':
            case 'contextmenu':
              L = Uf
              break
            case 'drag':
            case 'dragend':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'dragstart':
            case 'drop':
              L = Vg
              break
            case 'touchcancel':
            case 'touchend':
            case 'touchmove':
            case 'touchstart':
              L = ly
              break
            case ad:
            case ld:
            case id:
              L = Zg
              break
            case od:
              L = oy
              break
            case 'scroll':
            case 'scrollend':
              L = Yg
              break
            case 'wheel':
              L = sy
              break
            case 'copy':
            case 'cut':
            case 'paste':
              L = Pg
              break
            case 'gotpointercapture':
            case 'lostpointercapture':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'pointerup':
              L = Hf
              break
            case 'toggle':
            case 'beforetoggle':
              L = cy
          }
          var ot = (e & 4) !== 0,
            Nt = !ot && (t === 'scroll' || t === 'scrollend'),
            A = ot ? (D !== null ? D + 'Capture' : null) : D
          ot = []
          for (var R = z, w; R !== null; ) {
            var k = R
            if (
              ((w = k.stateNode),
              (k = k.tag),
              (k !== 5 && k !== 26 && k !== 27) ||
                w === null ||
                A === null ||
                ((k = Yl(R, A)), k != null && ot.push(Si(R, k, w))),
              Nt)
            )
              break
            R = R.return
          }
          0 < ot.length &&
            ((D = new L(D, I, null, n, H)), V.push({ event: D, listeners: ot }))
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((D = t === 'mouseover' || t === 'pointerover'),
            (L = t === 'mouseout' || t === 'pointerout'),
            D &&
              n !== rs &&
              (I = n.relatedTarget || n.fromElement) &&
              (Na(I) || I[Da]))
          )
            break t
          if (
            (L || D) &&
            ((D =
              H.window === H
                ? H
                : (D = H.ownerDocument)
                  ? D.defaultView || D.parentWindow
                  : window),
            L
              ? ((I = n.relatedTarget || n.toElement),
                (L = z),
                (I = I ? Na(I) : null),
                I !== null &&
                  ((Nt = f(I)),
                  (ot = I.tag),
                  I !== Nt || (ot !== 5 && ot !== 27 && ot !== 6)) &&
                  (I = null))
              : ((L = null), (I = z)),
            L !== I)
          ) {
            if (
              ((ot = Uf),
              (k = 'onMouseLeave'),
              (A = 'onMouseEnter'),
              (R = 'mouse'),
              (t === 'pointerout' || t === 'pointerover') &&
                ((ot = Hf),
                (k = 'onPointerLeave'),
                (A = 'onPointerEnter'),
                (R = 'pointer')),
              (Nt = L == null ? D : ql(L)),
              (w = I == null ? D : ql(I)),
              (D = new ot(k, R + 'leave', L, n, H)),
              (D.target = Nt),
              (D.relatedTarget = w),
              (k = null),
              Na(H) === z &&
                ((ot = new ot(A, R + 'enter', I, n, H)),
                (ot.target = w),
                (ot.relatedTarget = Nt),
                (k = ot)),
              (Nt = k),
              L && I)
            )
              e: {
                for (ot = u0, A = L, R = I, w = 0, k = A; k; k = ot(k)) w++
                k = 0
                for (var at = R; at; at = ot(at)) k++
                for (; 0 < w - k; ) ((A = ot(A)), w--)
                for (; 0 < k - w; ) ((R = ot(R)), k--)
                for (; w--; ) {
                  if (A === R || (R !== null && A === R.alternate)) {
                    ot = A
                    break e
                  }
                  ;((A = ot(A)), (R = ot(R)))
                }
                ot = null
              }
            else ot = null
            ;(L !== null && Om(V, D, L, ot, !1),
              I !== null && Nt !== null && Om(V, Nt, I, ot, !0))
          }
        }
        t: {
          if (
            ((D = z ? ql(z) : window),
            (L = D.nodeName && D.nodeName.toLowerCase()),
            L === 'select' || (L === 'input' && D.type === 'file'))
          )
            var Et = Zf
          else if (Xf(D))
            if (Kf) Et = Sy
            else {
              Et = yy
              var nt = gy
            }
          else
            ((L = D.nodeName),
              !L ||
              L.toLowerCase() !== 'input' ||
              (D.type !== 'checkbox' && D.type !== 'radio')
                ? z && os(z.elementType) && (Et = Zf)
                : (Et = by))
          if (Et && (Et = Et(t, z))) {
            Qf(V, Et, n, H)
            break t
          }
          ;(nt && nt(t, D, z),
            t === 'focusout' &&
              z &&
              D.type === 'number' &&
              z.memoizedProps.value != null &&
              is(D, 'number', D.value))
        }
        switch (((nt = z ? ql(z) : window), t)) {
          case 'focusin':
            ;(Xf(nt) || nt.contentEditable === 'true') &&
              ((Ga = nt), (Ss = z), (Jl = null))
            break
          case 'focusout':
            Jl = Ss = Ga = null
            break
          case 'mousedown':
            xs = !0
            break
          case 'contextmenu':
          case 'mouseup':
          case 'dragend':
            ;((xs = !1), ed(V, n, H))
            break
          case 'selectionchange':
            if (Ey) break
          case 'keydown':
          case 'keyup':
            ed(V, n, H)
        }
        var dt
        if (vs)
          t: {
            switch (t) {
              case 'compositionstart':
                var yt = 'onCompositionStart'
                break t
              case 'compositionend':
                yt = 'onCompositionEnd'
                break t
              case 'compositionupdate':
                yt = 'onCompositionUpdate'
                break t
            }
            yt = void 0
          }
        else
          Ya
            ? Gf(t, n) && (yt = 'onCompositionEnd')
            : t === 'keydown' &&
              n.keyCode === 229 &&
              (yt = 'onCompositionStart')
        ;(yt &&
          (kf &&
            n.locale !== 'ko' &&
            (Ya || yt !== 'onCompositionStart'
              ? yt === 'onCompositionEnd' && Ya && (dt = Lf())
              : ((Cn = H),
                (fs = 'value' in Cn ? Cn.value : Cn.textContent),
                (Ya = !0))),
          (nt = $o(z, yt)),
          0 < nt.length &&
            ((yt = new Bf(yt, t, null, n, H)),
            V.push({ event: yt, listeners: nt }),
            dt
              ? (yt.data = dt)
              : ((dt = Vf(n)), dt !== null && (yt.data = dt)))),
          (dt = dy ? hy(t, n) : my(t, n)) &&
            ((yt = $o(z, 'onBeforeInput')),
            0 < yt.length &&
              ((nt = new Bf('onBeforeInput', 'beforeinput', null, n, H)),
              V.push({ event: nt, listeners: yt }),
              (nt.data = dt))),
          i0(V, t, z, n, H))
      }
      Am(V, e)
    })
  }
  function Si(t, e, n) {
    return { instance: t, listener: e, currentTarget: n }
  }
  function $o(t, e) {
    for (var n = e + 'Capture', l = []; t !== null; ) {
      var r = t,
        u = r.stateNode
      if (
        ((r = r.tag),
        (r !== 5 && r !== 26 && r !== 27) ||
          u === null ||
          ((r = Yl(t, n)),
          r != null && l.unshift(Si(t, r, u)),
          (r = Yl(t, e)),
          r != null && l.push(Si(t, r, u))),
        t.tag === 3)
      )
        return l
      t = t.return
    }
    return []
  }
  function u0(t) {
    if (t === null) return null
    do t = t.return
    while (t && t.tag !== 5 && t.tag !== 27)
    return t || null
  }
  function Om(t, e, n, l, r) {
    for (var u = e._reactName, d = []; n !== null && n !== l; ) {
      var y = n,
        E = y.alternate,
        z = y.stateNode
      if (((y = y.tag), E !== null && E === l)) break
      ;((y !== 5 && y !== 26 && y !== 27) ||
        z === null ||
        ((E = z),
        r
          ? ((z = Yl(n, u)), z != null && d.unshift(Si(n, z, E)))
          : r || ((z = Yl(n, u)), z != null && d.push(Si(n, z, E)))),
        (n = n.return))
    }
    d.length !== 0 && t.push({ event: e, listeners: d })
  }
  var c0 = /\r\n?/g,
    f0 = /\u0000|\uFFFD/g
  function wm(t) {
    return (typeof t == 'string' ? t : '' + t)
      .replace(
        c0,
        `
`,
      )
      .replace(f0, '')
  }
  function zm(t, e) {
    return ((e = wm(e)), wm(t) === e)
  }
  function Dt(t, e, n, l, r, u) {
    switch (n) {
      case 'children':
        typeof l == 'string'
          ? e === 'body' || (e === 'textarea' && l === '') || Ha(t, l)
          : (typeof l == 'number' || typeof l == 'bigint') &&
            e !== 'body' &&
            Ha(t, '' + l)
        break
      case 'className':
        eo(t, 'class', l)
        break
      case 'tabIndex':
        eo(t, 'tabindex', l)
        break
      case 'dir':
      case 'role':
      case 'viewBox':
      case 'width':
      case 'height':
        eo(t, n, l)
        break
      case 'style':
        zf(t, l, u)
        break
      case 'data':
        if (e !== 'object') {
          eo(t, 'data', l)
          break
        }
      case 'src':
      case 'href':
        if (l === '' && (e !== 'a' || n !== 'href')) {
          t.removeAttribute(n)
          break
        }
        if (
          l == null ||
          typeof l == 'function' ||
          typeof l == 'symbol' ||
          typeof l == 'boolean'
        ) {
          t.removeAttribute(n)
          break
        }
        ;((l = ao('' + l)), t.setAttribute(n, l))
        break
      case 'action':
      case 'formAction':
        if (typeof l == 'function') {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          )
          break
        } else
          typeof u == 'function' &&
            (n === 'formAction'
              ? (e !== 'input' && Dt(t, e, 'name', r.name, r, null),
                Dt(t, e, 'formEncType', r.formEncType, r, null),
                Dt(t, e, 'formMethod', r.formMethod, r, null),
                Dt(t, e, 'formTarget', r.formTarget, r, null))
              : (Dt(t, e, 'encType', r.encType, r, null),
                Dt(t, e, 'method', r.method, r, null),
                Dt(t, e, 'target', r.target, r, null)))
        if (l == null || typeof l == 'symbol' || typeof l == 'boolean') {
          t.removeAttribute(n)
          break
        }
        ;((l = ao('' + l)), t.setAttribute(n, l))
        break
      case 'onClick':
        l != null && (t.onclick = en)
        break
      case 'onScroll':
        l != null && pt('scroll', t)
        break
      case 'onScrollEnd':
        l != null && pt('scrollend', t)
        break
      case 'dangerouslySetInnerHTML':
        if (l != null) {
          if (typeof l != 'object' || !('__html' in l)) throw Error(s(61))
          if (((n = l.__html), n != null)) {
            if (r.children != null) throw Error(s(60))
            t.innerHTML = n
          }
        }
        break
      case 'multiple':
        t.multiple = l && typeof l != 'function' && typeof l != 'symbol'
        break
      case 'muted':
        t.muted = l && typeof l != 'function' && typeof l != 'symbol'
        break
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'defaultValue':
      case 'defaultChecked':
      case 'innerHTML':
      case 'ref':
        break
      case 'autoFocus':
        break
      case 'xlinkHref':
        if (
          l == null ||
          typeof l == 'function' ||
          typeof l == 'boolean' ||
          typeof l == 'symbol'
        ) {
          t.removeAttribute('xlink:href')
          break
        }
        ;((n = ao('' + l)),
          t.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', n))
        break
      case 'contentEditable':
      case 'spellCheck':
      case 'draggable':
      case 'value':
      case 'autoReverse':
      case 'externalResourcesRequired':
      case 'focusable':
      case 'preserveAlpha':
        l != null && typeof l != 'function' && typeof l != 'symbol'
          ? t.setAttribute(n, '' + l)
          : t.removeAttribute(n)
        break
      case 'inert':
      case 'allowFullScreen':
      case 'async':
      case 'autoPlay':
      case 'controls':
      case 'default':
      case 'defer':
      case 'disabled':
      case 'disablePictureInPicture':
      case 'disableRemotePlayback':
      case 'formNoValidate':
      case 'hidden':
      case 'loop':
      case 'noModule':
      case 'noValidate':
      case 'open':
      case 'playsInline':
      case 'readOnly':
      case 'required':
      case 'reversed':
      case 'scoped':
      case 'seamless':
      case 'itemScope':
        l && typeof l != 'function' && typeof l != 'symbol'
          ? t.setAttribute(n, '')
          : t.removeAttribute(n)
        break
      case 'capture':
      case 'download':
        l === !0
          ? t.setAttribute(n, '')
          : l !== !1 &&
              l != null &&
              typeof l != 'function' &&
              typeof l != 'symbol'
            ? t.setAttribute(n, l)
            : t.removeAttribute(n)
        break
      case 'cols':
      case 'rows':
      case 'size':
      case 'span':
        l != null &&
        typeof l != 'function' &&
        typeof l != 'symbol' &&
        !isNaN(l) &&
        1 <= l
          ? t.setAttribute(n, l)
          : t.removeAttribute(n)
        break
      case 'rowSpan':
      case 'start':
        l == null || typeof l == 'function' || typeof l == 'symbol' || isNaN(l)
          ? t.removeAttribute(n)
          : t.setAttribute(n, l)
        break
      case 'popover':
        ;(pt('beforetoggle', t), pt('toggle', t), to(t, 'popover', l))
        break
      case 'xlinkActuate':
        tn(t, 'http://www.w3.org/1999/xlink', 'xlink:actuate', l)
        break
      case 'xlinkArcrole':
        tn(t, 'http://www.w3.org/1999/xlink', 'xlink:arcrole', l)
        break
      case 'xlinkRole':
        tn(t, 'http://www.w3.org/1999/xlink', 'xlink:role', l)
        break
      case 'xlinkShow':
        tn(t, 'http://www.w3.org/1999/xlink', 'xlink:show', l)
        break
      case 'xlinkTitle':
        tn(t, 'http://www.w3.org/1999/xlink', 'xlink:title', l)
        break
      case 'xlinkType':
        tn(t, 'http://www.w3.org/1999/xlink', 'xlink:type', l)
        break
      case 'xmlBase':
        tn(t, 'http://www.w3.org/XML/1998/namespace', 'xml:base', l)
        break
      case 'xmlLang':
        tn(t, 'http://www.w3.org/XML/1998/namespace', 'xml:lang', l)
        break
      case 'xmlSpace':
        tn(t, 'http://www.w3.org/XML/1998/namespace', 'xml:space', l)
        break
      case 'is':
        to(t, 'is', l)
        break
      case 'innerText':
      case 'textContent':
        break
      default:
        ;(!(2 < n.length) ||
          (n[0] !== 'o' && n[0] !== 'O') ||
          (n[1] !== 'n' && n[1] !== 'N')) &&
          ((n = kg.get(n) || n), to(t, n, l))
    }
  }
  function Zu(t, e, n, l, r, u) {
    switch (n) {
      case 'style':
        zf(t, l, u)
        break
      case 'dangerouslySetInnerHTML':
        if (l != null) {
          if (typeof l != 'object' || !('__html' in l)) throw Error(s(61))
          if (((n = l.__html), n != null)) {
            if (r.children != null) throw Error(s(60))
            t.innerHTML = n
          }
        }
        break
      case 'children':
        typeof l == 'string'
          ? Ha(t, l)
          : (typeof l == 'number' || typeof l == 'bigint') && Ha(t, '' + l)
        break
      case 'onScroll':
        l != null && pt('scroll', t)
        break
      case 'onScrollEnd':
        l != null && pt('scrollend', t)
        break
      case 'onClick':
        l != null && (t.onclick = en)
        break
      case 'suppressContentEditableWarning':
      case 'suppressHydrationWarning':
      case 'innerHTML':
      case 'ref':
        break
      case 'innerText':
      case 'textContent':
        break
      default:
        if (!Ef.hasOwnProperty(n))
          t: {
            if (
              n[0] === 'o' &&
              n[1] === 'n' &&
              ((r = n.endsWith('Capture')),
              (e = n.slice(2, r ? n.length - 7 : void 0)),
              (u = t[se] || null),
              (u = u != null ? u[n] : null),
              typeof u == 'function' && t.removeEventListener(e, u, r),
              typeof l == 'function')
            ) {
              ;(typeof u != 'function' &&
                u !== null &&
                (n in t
                  ? (t[n] = null)
                  : t.hasAttribute(n) && t.removeAttribute(n)),
                t.addEventListener(e, l, r))
              break t
            }
            n in t ? (t[n] = l) : l === !0 ? t.setAttribute(n, '') : to(t, n, l)
          }
    }
  }
  function ae(t, e, n) {
    switch (e) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break
      case 'img':
        ;(pt('error', t), pt('load', t))
        var l = !1,
          r = !1,
          u
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var d = n[u]
            if (d != null)
              switch (u) {
                case 'src':
                  l = !0
                  break
                case 'srcSet':
                  r = !0
                  break
                case 'children':
                case 'dangerouslySetInnerHTML':
                  throw Error(s(137, e))
                default:
                  Dt(t, e, u, d, n, null)
              }
          }
        ;(r && Dt(t, e, 'srcSet', n.srcSet, n, null),
          l && Dt(t, e, 'src', n.src, n, null))
        return
      case 'input':
        pt('invalid', t)
        var y = (u = d = r = null),
          E = null,
          z = null
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var H = n[l]
            if (H != null)
              switch (l) {
                case 'name':
                  r = H
                  break
                case 'type':
                  d = H
                  break
                case 'checked':
                  E = H
                  break
                case 'defaultChecked':
                  z = H
                  break
                case 'value':
                  u = H
                  break
                case 'defaultValue':
                  y = H
                  break
                case 'children':
                case 'dangerouslySetInnerHTML':
                  if (H != null) throw Error(s(137, e))
                  break
                default:
                  Dt(t, e, l, H, n, null)
              }
          }
        Af(t, u, y, E, z, d, r, !1)
        return
      case 'select':
        ;(pt('invalid', t), (l = d = u = null))
        for (r in n)
          if (n.hasOwnProperty(r) && ((y = n[r]), y != null))
            switch (r) {
              case 'value':
                u = y
                break
              case 'defaultValue':
                d = y
                break
              case 'multiple':
                l = y
              default:
                Dt(t, e, r, y, n, null)
            }
        ;((e = u),
          (n = d),
          (t.multiple = !!l),
          e != null ? Ba(t, !!l, e, !1) : n != null && Ba(t, !!l, n, !0))
        return
      case 'textarea':
        ;(pt('invalid', t), (u = r = l = null))
        for (d in n)
          if (n.hasOwnProperty(d) && ((y = n[d]), y != null))
            switch (d) {
              case 'value':
                l = y
                break
              case 'defaultValue':
                r = y
                break
              case 'children':
                u = y
                break
              case 'dangerouslySetInnerHTML':
                if (y != null) throw Error(s(91))
                break
              default:
                Dt(t, e, d, y, n, null)
            }
        Of(t, l, r, u)
        return
      case 'option':
        for (E in n)
          if (n.hasOwnProperty(E) && ((l = n[E]), l != null))
            switch (E) {
              case 'selected':
                t.selected = l && typeof l != 'function' && typeof l != 'symbol'
                break
              default:
                Dt(t, e, E, l, n, null)
            }
        return
      case 'dialog':
        ;(pt('beforetoggle', t),
          pt('toggle', t),
          pt('cancel', t),
          pt('close', t))
        break
      case 'iframe':
      case 'object':
        pt('load', t)
        break
      case 'video':
      case 'audio':
        for (l = 0; l < bi.length; l++) pt(bi[l], t)
        break
      case 'image':
        ;(pt('error', t), pt('load', t))
        break
      case 'details':
        pt('toggle', t)
        break
      case 'embed':
      case 'source':
      case 'link':
        ;(pt('error', t), pt('load', t))
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (z in n)
          if (n.hasOwnProperty(z) && ((l = n[z]), l != null))
            switch (z) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                throw Error(s(137, e))
              default:
                Dt(t, e, z, l, n, null)
            }
        return
      default:
        if (os(e)) {
          for (H in n)
            n.hasOwnProperty(H) &&
              ((l = n[H]), l !== void 0 && Zu(t, e, H, l, n, void 0))
          return
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && ((l = n[y]), l != null && Dt(t, e, y, l, n, null))
  }
  function d0(t, e, n, l) {
    switch (e) {
      case 'div':
      case 'span':
      case 'svg':
      case 'path':
      case 'a':
      case 'g':
      case 'p':
      case 'li':
        break
      case 'input':
        var r = null,
          u = null,
          d = null,
          y = null,
          E = null,
          z = null,
          H = null
        for (L in n) {
          var V = n[L]
          if (n.hasOwnProperty(L) && V != null)
            switch (L) {
              case 'checked':
                break
              case 'value':
                break
              case 'defaultValue':
                E = V
              default:
                l.hasOwnProperty(L) || Dt(t, e, L, null, l, V)
            }
        }
        for (var D in l) {
          var L = l[D]
          if (((V = n[D]), l.hasOwnProperty(D) && (L != null || V != null)))
            switch (D) {
              case 'type':
                u = L
                break
              case 'name':
                r = L
                break
              case 'checked':
                z = L
                break
              case 'defaultChecked':
                H = L
                break
              case 'value':
                d = L
                break
              case 'defaultValue':
                y = L
                break
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (L != null) throw Error(s(137, e))
                break
              default:
                L !== V && Dt(t, e, D, L, l, V)
            }
        }
        ls(t, d, y, E, z, H, u, r)
        return
      case 'select':
        L = d = y = D = null
        for (u in n)
          if (((E = n[u]), n.hasOwnProperty(u) && E != null))
            switch (u) {
              case 'value':
                break
              case 'multiple':
                L = E
              default:
                l.hasOwnProperty(u) || Dt(t, e, u, null, l, E)
            }
        for (r in l)
          if (
            ((u = l[r]),
            (E = n[r]),
            l.hasOwnProperty(r) && (u != null || E != null))
          )
            switch (r) {
              case 'value':
                D = u
                break
              case 'defaultValue':
                y = u
                break
              case 'multiple':
                d = u
              default:
                u !== E && Dt(t, e, r, u, l, E)
            }
        ;((e = y),
          (n = d),
          (l = L),
          D != null
            ? Ba(t, !!n, D, !1)
            : !!l != !!n &&
              (e != null ? Ba(t, !!n, e, !0) : Ba(t, !!n, n ? [] : '', !1)))
        return
      case 'textarea':
        L = D = null
        for (y in n)
          if (
            ((r = n[y]),
            n.hasOwnProperty(y) && r != null && !l.hasOwnProperty(y))
          )
            switch (y) {
              case 'value':
                break
              case 'children':
                break
              default:
                Dt(t, e, y, null, l, r)
            }
        for (d in l)
          if (
            ((r = l[d]),
            (u = n[d]),
            l.hasOwnProperty(d) && (r != null || u != null))
          )
            switch (d) {
              case 'value':
                D = r
                break
              case 'defaultValue':
                L = r
                break
              case 'children':
                break
              case 'dangerouslySetInnerHTML':
                if (r != null) throw Error(s(91))
                break
              default:
                r !== u && Dt(t, e, d, r, l, u)
            }
        Mf(t, D, L)
        return
      case 'option':
        for (var I in n)
          if (
            ((D = n[I]),
            n.hasOwnProperty(I) && D != null && !l.hasOwnProperty(I))
          )
            switch (I) {
              case 'selected':
                t.selected = !1
                break
              default:
                Dt(t, e, I, null, l, D)
            }
        for (E in l)
          if (
            ((D = l[E]),
            (L = n[E]),
            l.hasOwnProperty(E) && D !== L && (D != null || L != null))
          )
            switch (E) {
              case 'selected':
                t.selected = D && typeof D != 'function' && typeof D != 'symbol'
                break
              default:
                Dt(t, e, E, D, l, L)
            }
        return
      case 'img':
      case 'link':
      case 'area':
      case 'base':
      case 'br':
      case 'col':
      case 'embed':
      case 'hr':
      case 'keygen':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
      case 'wbr':
      case 'menuitem':
        for (var ot in n)
          ((D = n[ot]),
            n.hasOwnProperty(ot) &&
              D != null &&
              !l.hasOwnProperty(ot) &&
              Dt(t, e, ot, null, l, D))
        for (z in l)
          if (
            ((D = l[z]),
            (L = n[z]),
            l.hasOwnProperty(z) && D !== L && (D != null || L != null))
          )
            switch (z) {
              case 'children':
              case 'dangerouslySetInnerHTML':
                if (D != null) throw Error(s(137, e))
                break
              default:
                Dt(t, e, z, D, l, L)
            }
        return
      default:
        if (os(e)) {
          for (var Nt in n)
            ((D = n[Nt]),
              n.hasOwnProperty(Nt) &&
                D !== void 0 &&
                !l.hasOwnProperty(Nt) &&
                Zu(t, e, Nt, void 0, l, D))
          for (H in l)
            ((D = l[H]),
              (L = n[H]),
              !l.hasOwnProperty(H) ||
                D === L ||
                (D === void 0 && L === void 0) ||
                Zu(t, e, H, D, l, L))
          return
        }
    }
    for (var A in n)
      ((D = n[A]),
        n.hasOwnProperty(A) &&
          D != null &&
          !l.hasOwnProperty(A) &&
          Dt(t, e, A, null, l, D))
    for (V in l)
      ((D = l[V]),
        (L = n[V]),
        !l.hasOwnProperty(V) ||
          D === L ||
          (D == null && L == null) ||
          Dt(t, e, V, D, l, L))
  }
  function Dm(t) {
    switch (t) {
      case 'css':
      case 'script':
      case 'font':
      case 'img':
      case 'image':
      case 'input':
      case 'link':
        return !0
      default:
        return !1
    }
  }
  function h0() {
    if (typeof performance.getEntriesByType == 'function') {
      for (
        var t = 0, e = 0, n = performance.getEntriesByType('resource'), l = 0;
        l < n.length;
        l++
      ) {
        var r = n[l],
          u = r.transferSize,
          d = r.initiatorType,
          y = r.duration
        if (u && y && Dm(d)) {
          for (d = 0, y = r.responseEnd, l += 1; l < n.length; l++) {
            var E = n[l],
              z = E.startTime
            if (z > y) break
            var H = E.transferSize,
              V = E.initiatorType
            H &&
              Dm(V) &&
              ((E = E.responseEnd), (d += H * (E < y ? 1 : (y - z) / (E - z))))
          }
          if ((--l, (e += (8 * (u + d)) / (r.duration / 1e3)), t++, 10 < t))
            break
        }
      }
      if (0 < t) return e / t / 1e6
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == 'number')
      ? t
      : 5
  }
  var Ku = null,
    Pu = null
  function Io(t) {
    return t.nodeType === 9 ? t : t.ownerDocument
  }
  function Nm(t) {
    switch (t) {
      case 'http://www.w3.org/2000/svg':
        return 1
      case 'http://www.w3.org/1998/Math/MathML':
        return 2
      default:
        return 0
    }
  }
  function Lm(t, e) {
    if (t === 0)
      switch (e) {
        case 'svg':
          return 1
        case 'math':
          return 2
        default:
          return 0
      }
    return t === 1 && e === 'foreignObject' ? 0 : t
  }
  function Ju(t, e) {
    return (
      t === 'textarea' ||
      t === 'noscript' ||
      typeof e.children == 'string' ||
      typeof e.children == 'number' ||
      typeof e.children == 'bigint' ||
      (typeof e.dangerouslySetInnerHTML == 'object' &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    )
  }
  var Fu = null
  function m0() {
    var t = window.event
    return t && t.type === 'popstate'
      ? t === Fu
        ? !1
        : ((Fu = t), !0)
      : ((Fu = null), !1)
  }
  var jm = typeof setTimeout == 'function' ? setTimeout : void 0,
    p0 = typeof clearTimeout == 'function' ? clearTimeout : void 0,
    Um = typeof Promise == 'function' ? Promise : void 0,
    v0 =
      typeof queueMicrotask == 'function'
        ? queueMicrotask
        : typeof Um < 'u'
          ? function (t) {
              return Um.resolve(null).then(t).catch(g0)
            }
          : jm
  function g0(t) {
    setTimeout(function () {
      throw t
    })
  }
  function Vn(t) {
    return t === 'head'
  }
  function Bm(t, e) {
    var n = e,
      l = 0
    do {
      var r = n.nextSibling
      if ((t.removeChild(n), r && r.nodeType === 8))
        if (((n = r.data), n === '/$' || n === '/&')) {
          if (l === 0) {
            ;(t.removeChild(r), pl(e))
            return
          }
          l--
        } else if (
          n === '$' ||
          n === '$?' ||
          n === '$~' ||
          n === '$!' ||
          n === '&'
        )
          l++
        else if (n === 'html') xi(t.ownerDocument.documentElement)
        else if (n === 'head') {
          ;((n = t.ownerDocument.head), xi(n))
          for (var u = n.firstChild; u; ) {
            var d = u.nextSibling,
              y = u.nodeName
            ;(u[kl] ||
              y === 'SCRIPT' ||
              y === 'STYLE' ||
              (y === 'LINK' && u.rel.toLowerCase() === 'stylesheet') ||
              n.removeChild(u),
              (u = d))
          }
        } else n === 'body' && xi(t.ownerDocument.body)
      n = r
    } while (n)
    pl(e)
  }
  function Hm(t, e) {
    var n = t
    t = 0
    do {
      var l = n.nextSibling
      if (
        (n.nodeType === 1
          ? e
            ? ((n._stashedDisplay = n.style.display),
              (n.style.display = 'none'))
            : ((n.style.display = n._stashedDisplay || ''),
              n.getAttribute('style') === '' && n.removeAttribute('style'))
          : n.nodeType === 3 &&
            (e
              ? ((n._stashedText = n.nodeValue), (n.nodeValue = ''))
              : (n.nodeValue = n._stashedText || '')),
        l && l.nodeType === 8)
      )
        if (((n = l.data), n === '/$')) {
          if (t === 0) break
          t--
        } else (n !== '$' && n !== '$?' && n !== '$~' && n !== '$!') || t++
      n = l
    } while (n)
  }
  function Wu(t) {
    var e = t.firstChild
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e
      switch (((e = e.nextSibling), n.nodeName)) {
        case 'HTML':
        case 'HEAD':
        case 'BODY':
          ;(Wu(n), ns(n))
          continue
        case 'SCRIPT':
        case 'STYLE':
          continue
        case 'LINK':
          if (n.rel.toLowerCase() === 'stylesheet') continue
      }
      t.removeChild(n)
    }
  }
  function y0(t, e, n, l) {
    for (; t.nodeType === 1; ) {
      var r = n
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== 'INPUT' || t.type !== 'hidden')) break
      } else if (l) {
        if (!t[kl])
          switch (e) {
            case 'meta':
              if (!t.hasAttribute('itemprop')) break
              return t
            case 'link':
              if (
                ((u = t.getAttribute('rel')),
                u === 'stylesheet' && t.hasAttribute('data-precedence'))
              )
                break
              if (
                u !== r.rel ||
                t.getAttribute('href') !==
                  (r.href == null || r.href === '' ? null : r.href) ||
                t.getAttribute('crossorigin') !==
                  (r.crossOrigin == null ? null : r.crossOrigin) ||
                t.getAttribute('title') !== (r.title == null ? null : r.title)
              )
                break
              return t
            case 'style':
              if (t.hasAttribute('data-precedence')) break
              return t
            case 'script':
              if (
                ((u = t.getAttribute('src')),
                (u !== (r.src == null ? null : r.src) ||
                  t.getAttribute('type') !== (r.type == null ? null : r.type) ||
                  t.getAttribute('crossorigin') !==
                    (r.crossOrigin == null ? null : r.crossOrigin)) &&
                  u &&
                  t.hasAttribute('async') &&
                  !t.hasAttribute('itemprop'))
              )
                break
              return t
            default:
              return t
          }
      } else if (e === 'input' && t.type === 'hidden') {
        var u = r.name == null ? null : '' + r.name
        if (r.type === 'hidden' && t.getAttribute('name') === u) return t
      } else return t
      if (((t = Be(t.nextSibling)), t === null)) break
    }
    return null
  }
  function b0(t, e, n) {
    if (e === '') return null
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') &&
          !n) ||
        ((t = Be(t.nextSibling)), t === null)
      )
        return null
    return t
  }
  function km(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== 'INPUT' || t.type !== 'hidden') &&
          !e) ||
        ((t = Be(t.nextSibling)), t === null)
      )
        return null
    return t
  }
  function $u(t) {
    return t.data === '$?' || t.data === '$~'
  }
  function Iu(t) {
    return (
      t.data === '$!' ||
      (t.data === '$?' && t.ownerDocument.readyState !== 'loading')
    )
  }
  function S0(t, e) {
    var n = t.ownerDocument
    if (t.data === '$~') t._reactRetry = e
    else if (t.data !== '$?' || n.readyState !== 'loading') e()
    else {
      var l = function () {
        ;(e(), n.removeEventListener('DOMContentLoaded', l))
      }
      ;(n.addEventListener('DOMContentLoaded', l), (t._reactRetry = l))
    }
  }
  function Be(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType
      if (e === 1 || e === 3) break
      if (e === 8) {
        if (
          ((e = t.data),
          e === '$' ||
            e === '$!' ||
            e === '$?' ||
            e === '$~' ||
            e === '&' ||
            e === 'F!' ||
            e === 'F')
        )
          break
        if (e === '/$' || e === '/&') return null
      }
    }
    return t
  }
  var tc = null
  function qm(t) {
    t = t.nextSibling
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data
        if (n === '/$' || n === '/&') {
          if (e === 0) return Be(t.nextSibling)
          e--
        } else
          (n !== '$' && n !== '$!' && n !== '$?' && n !== '$~' && n !== '&') ||
            e++
      }
      t = t.nextSibling
    }
    return null
  }
  function Ym(t) {
    t = t.previousSibling
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data
        if (n === '$' || n === '$!' || n === '$?' || n === '$~' || n === '&') {
          if (e === 0) return t
          e--
        } else (n !== '/$' && n !== '/&') || e++
      }
      t = t.previousSibling
    }
    return null
  }
  function Gm(t, e, n) {
    switch (((e = Io(n)), t)) {
      case 'html':
        if (((t = e.documentElement), !t)) throw Error(s(452))
        return t
      case 'head':
        if (((t = e.head), !t)) throw Error(s(453))
        return t
      case 'body':
        if (((t = e.body), !t)) throw Error(s(454))
        return t
      default:
        throw Error(s(451))
    }
  }
  function xi(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0])
    ns(t)
  }
  var He = new Map(),
    Vm = new Set()
  function tr(t) {
    return typeof t.getRootNode == 'function'
      ? t.getRootNode()
      : t.nodeType === 9
        ? t
        : t.ownerDocument
  }
  var yn = J.d
  J.d = { f: x0, r: E0, D: _0, C: R0, L: T0, m: C0, X: M0, S: A0, M: O0 }
  function x0() {
    var t = yn.f(),
      e = Qo()
    return t || e
  }
  function E0(t) {
    var e = La(t)
    e !== null && e.tag === 5 && e.type === 'form' ? oh(e) : yn.r(t)
  }
  var dl = typeof document > 'u' ? null : document
  function Xm(t, e, n) {
    var l = dl
    if (l && typeof e == 'string' && e) {
      var r = we(e)
      ;((r = 'link[rel="' + t + '"][href="' + r + '"]'),
        typeof n == 'string' && (r += '[crossorigin="' + n + '"]'),
        Vm.has(r) ||
          (Vm.add(r),
          (t = { rel: t, crossOrigin: n, href: e }),
          l.querySelector(r) === null &&
            ((e = l.createElement('link')),
            ae(e, 'link', t),
            Wt(e),
            l.head.appendChild(e))))
    }
  }
  function _0(t) {
    ;(yn.D(t), Xm('dns-prefetch', t, null))
  }
  function R0(t, e) {
    ;(yn.C(t, e), Xm('preconnect', t, e))
  }
  function T0(t, e, n) {
    yn.L(t, e, n)
    var l = dl
    if (l && t && e) {
      var r = 'link[rel="preload"][as="' + we(e) + '"]'
      e === 'image' && n && n.imageSrcSet
        ? ((r += '[imagesrcset="' + we(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == 'string' &&
            (r += '[imagesizes="' + we(n.imageSizes) + '"]'))
        : (r += '[href="' + we(t) + '"]')
      var u = r
      switch (e) {
        case 'style':
          u = hl(t)
          break
        case 'script':
          u = ml(t)
      }
      He.has(u) ||
        ((t = g(
          {
            rel: 'preload',
            href: e === 'image' && n && n.imageSrcSet ? void 0 : t,
            as: e,
          },
          n,
        )),
        He.set(u, t),
        l.querySelector(r) !== null ||
          (e === 'style' && l.querySelector(Ei(u))) ||
          (e === 'script' && l.querySelector(_i(u))) ||
          ((e = l.createElement('link')),
          ae(e, 'link', t),
          Wt(e),
          l.head.appendChild(e)))
    }
  }
  function C0(t, e) {
    yn.m(t, e)
    var n = dl
    if (n && t) {
      var l = e && typeof e.as == 'string' ? e.as : 'script',
        r =
          'link[rel="modulepreload"][as="' + we(l) + '"][href="' + we(t) + '"]',
        u = r
      switch (l) {
        case 'audioworklet':
        case 'paintworklet':
        case 'serviceworker':
        case 'sharedworker':
        case 'worker':
        case 'script':
          u = ml(t)
      }
      if (
        !He.has(u) &&
        ((t = g({ rel: 'modulepreload', href: t }, e)),
        He.set(u, t),
        n.querySelector(r) === null)
      ) {
        switch (l) {
          case 'audioworklet':
          case 'paintworklet':
          case 'serviceworker':
          case 'sharedworker':
          case 'worker':
          case 'script':
            if (n.querySelector(_i(u))) return
        }
        ;((l = n.createElement('link')),
          ae(l, 'link', t),
          Wt(l),
          n.head.appendChild(l))
      }
    }
  }
  function A0(t, e, n) {
    yn.S(t, e, n)
    var l = dl
    if (l && t) {
      var r = ja(l).hoistableStyles,
        u = hl(t)
      e = e || 'default'
      var d = r.get(u)
      if (!d) {
        var y = { loading: 0, preload: null }
        if ((d = l.querySelector(Ei(u)))) y.loading = 5
        else {
          ;((t = g({ rel: 'stylesheet', href: t, 'data-precedence': e }, n)),
            (n = He.get(u)) && ec(t, n))
          var E = (d = l.createElement('link'))
          ;(Wt(E),
            ae(E, 'link', t),
            (E._p = new Promise(function (z, H) {
              ;((E.onload = z), (E.onerror = H))
            })),
            E.addEventListener('load', function () {
              y.loading |= 1
            }),
            E.addEventListener('error', function () {
              y.loading |= 2
            }),
            (y.loading |= 4),
            er(d, e, l))
        }
        ;((d = { type: 'stylesheet', instance: d, count: 1, state: y }),
          r.set(u, d))
      }
    }
  }
  function M0(t, e) {
    yn.X(t, e)
    var n = dl
    if (n && t) {
      var l = ja(n).hoistableScripts,
        r = ml(t),
        u = l.get(r)
      u ||
        ((u = n.querySelector(_i(r))),
        u ||
          ((t = g({ src: t, async: !0 }, e)),
          (e = He.get(r)) && nc(t, e),
          (u = n.createElement('script')),
          Wt(u),
          ae(u, 'link', t),
          n.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        l.set(r, u))
    }
  }
  function O0(t, e) {
    yn.M(t, e)
    var n = dl
    if (n && t) {
      var l = ja(n).hoistableScripts,
        r = ml(t),
        u = l.get(r)
      u ||
        ((u = n.querySelector(_i(r))),
        u ||
          ((t = g({ src: t, async: !0, type: 'module' }, e)),
          (e = He.get(r)) && nc(t, e),
          (u = n.createElement('script')),
          Wt(u),
          ae(u, 'link', t),
          n.head.appendChild(u)),
        (u = { type: 'script', instance: u, count: 1, state: null }),
        l.set(r, u))
    }
  }
  function Qm(t, e, n, l) {
    var r = (r = rt.current) ? tr(r) : null
    if (!r) throw Error(s(446))
    switch (t) {
      case 'meta':
      case 'title':
        return null
      case 'style':
        return typeof n.precedence == 'string' && typeof n.href == 'string'
          ? ((e = hl(n.href)),
            (n = ja(r).hoistableStyles),
            (l = n.get(e)),
            l ||
              ((l = { type: 'style', instance: null, count: 0, state: null }),
              n.set(e, l)),
            l)
          : { type: 'void', instance: null, count: 0, state: null }
      case 'link':
        if (
          n.rel === 'stylesheet' &&
          typeof n.href == 'string' &&
          typeof n.precedence == 'string'
        ) {
          t = hl(n.href)
          var u = ja(r).hoistableStyles,
            d = u.get(t)
          if (
            (d ||
              ((r = r.ownerDocument || r),
              (d = {
                type: 'stylesheet',
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(t, d),
              (u = r.querySelector(Ei(t))) &&
                !u._p &&
                ((d.instance = u), (d.state.loading = 5)),
              He.has(t) ||
                ((n = {
                  rel: 'preload',
                  as: 'style',
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                He.set(t, n),
                u || w0(r, t, n, d.state))),
            e && l === null)
          )
            throw Error(s(528, ''))
          return d
        }
        if (e && l !== null) throw Error(s(529, ''))
        return null
      case 'script':
        return (
          (e = n.async),
          (n = n.src),
          typeof n == 'string' &&
          e &&
          typeof e != 'function' &&
          typeof e != 'symbol'
            ? ((e = ml(n)),
              (n = ja(r).hoistableScripts),
              (l = n.get(e)),
              l ||
                ((l = {
                  type: 'script',
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(e, l)),
              l)
            : { type: 'void', instance: null, count: 0, state: null }
        )
      default:
        throw Error(s(444, t))
    }
  }
  function hl(t) {
    return 'href="' + we(t) + '"'
  }
  function Ei(t) {
    return 'link[rel="stylesheet"][' + t + ']'
  }
  function Zm(t) {
    return g({}, t, { 'data-precedence': t.precedence, precedence: null })
  }
  function w0(t, e, n, l) {
    t.querySelector('link[rel="preload"][as="style"][' + e + ']')
      ? (l.loading = 1)
      : ((e = t.createElement('link')),
        (l.preload = e),
        e.addEventListener('load', function () {
          return (l.loading |= 1)
        }),
        e.addEventListener('error', function () {
          return (l.loading |= 2)
        }),
        ae(e, 'link', n),
        Wt(e),
        t.head.appendChild(e))
  }
  function ml(t) {
    return '[src="' + we(t) + '"]'
  }
  function _i(t) {
    return 'script[async]' + t
  }
  function Km(t, e, n) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case 'style':
          var l = t.querySelector('style[data-href~="' + we(n.href) + '"]')
          if (l) return ((e.instance = l), Wt(l), l)
          var r = g({}, n, {
            'data-href': n.href,
            'data-precedence': n.precedence,
            href: null,
            precedence: null,
          })
          return (
            (l = (t.ownerDocument || t).createElement('style')),
            Wt(l),
            ae(l, 'style', r),
            er(l, n.precedence, t),
            (e.instance = l)
          )
        case 'stylesheet':
          r = hl(n.href)
          var u = t.querySelector(Ei(r))
          if (u) return ((e.state.loading |= 4), (e.instance = u), Wt(u), u)
          ;((l = Zm(n)),
            (r = He.get(r)) && ec(l, r),
            (u = (t.ownerDocument || t).createElement('link')),
            Wt(u))
          var d = u
          return (
            (d._p = new Promise(function (y, E) {
              ;((d.onload = y), (d.onerror = E))
            })),
            ae(u, 'link', l),
            (e.state.loading |= 4),
            er(u, n.precedence, t),
            (e.instance = u)
          )
        case 'script':
          return (
            (u = ml(n.src)),
            (r = t.querySelector(_i(u)))
              ? ((e.instance = r), Wt(r), r)
              : ((l = n),
                (r = He.get(u)) && ((l = g({}, n)), nc(l, r)),
                (t = t.ownerDocument || t),
                (r = t.createElement('script')),
                Wt(r),
                ae(r, 'link', l),
                t.head.appendChild(r),
                (e.instance = r))
          )
        case 'void':
          return null
        default:
          throw Error(s(443, e.type))
      }
    else
      e.type === 'stylesheet' &&
        (e.state.loading & 4) === 0 &&
        ((l = e.instance), (e.state.loading |= 4), er(l, n.precedence, t))
    return e.instance
  }
  function er(t, e, n) {
    for (
      var l = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        r = l.length ? l[l.length - 1] : null,
        u = r,
        d = 0;
      d < l.length;
      d++
    ) {
      var y = l[d]
      if (y.dataset.precedence === e) u = y
      else if (u !== r) break
    }
    u
      ? u.parentNode.insertBefore(t, u.nextSibling)
      : ((e = n.nodeType === 9 ? n.head : n), e.insertBefore(t, e.firstChild))
  }
  function ec(t, e) {
    ;(t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title))
  }
  function nc(t, e) {
    ;(t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity))
  }
  var nr = null
  function Pm(t, e, n) {
    if (nr === null) {
      var l = new Map(),
        r = (nr = new Map())
      r.set(n, l)
    } else ((r = nr), (l = r.get(n)), l || ((l = new Map()), r.set(n, l)))
    if (l.has(t)) return l
    for (
      l.set(t, null), n = n.getElementsByTagName(t), r = 0;
      r < n.length;
      r++
    ) {
      var u = n[r]
      if (
        !(
          u[kl] ||
          u[It] ||
          (t === 'link' && u.getAttribute('rel') === 'stylesheet')
        ) &&
        u.namespaceURI !== 'http://www.w3.org/2000/svg'
      ) {
        var d = u.getAttribute(e) || ''
        d = t + d
        var y = l.get(d)
        y ? y.push(u) : l.set(d, [u])
      }
    }
    return l
  }
  function Jm(t, e, n) {
    ;((t = t.ownerDocument || t),
      t.head.insertBefore(
        n,
        e === 'title' ? t.querySelector('head > title') : null,
      ))
  }
  function z0(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1
    switch (t) {
      case 'meta':
      case 'title':
        return !0
      case 'style':
        if (
          typeof e.precedence != 'string' ||
          typeof e.href != 'string' ||
          e.href === ''
        )
          break
        return !0
      case 'link':
        if (
          typeof e.rel != 'string' ||
          typeof e.href != 'string' ||
          e.href === '' ||
          e.onLoad ||
          e.onError
        )
          break
        switch (e.rel) {
          case 'stylesheet':
            return (
              (t = e.disabled),
              typeof e.precedence == 'string' && t == null
            )
          default:
            return !0
        }
      case 'script':
        if (
          e.async &&
          typeof e.async != 'function' &&
          typeof e.async != 'symbol' &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == 'string'
        )
          return !0
    }
    return !1
  }
  function Fm(t) {
    return !(t.type === 'stylesheet' && (t.state.loading & 3) === 0)
  }
  function D0(t, e, n, l) {
    if (
      n.type === 'stylesheet' &&
      (typeof l.media != 'string' || matchMedia(l.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var r = hl(l.href),
          u = e.querySelector(Ei(r))
        if (u) {
          ;((e = u._p),
            e !== null &&
              typeof e == 'object' &&
              typeof e.then == 'function' &&
              (t.count++, (t = ar.bind(t)), e.then(t, t)),
            (n.state.loading |= 4),
            (n.instance = u),
            Wt(u))
          return
        }
        ;((u = e.ownerDocument || e),
          (l = Zm(l)),
          (r = He.get(r)) && ec(l, r),
          (u = u.createElement('link')),
          Wt(u))
        var d = u
        ;((d._p = new Promise(function (y, E) {
          ;((d.onload = y), (d.onerror = E))
        })),
          ae(u, 'link', l),
          (n.instance = u))
      }
      ;(t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(n, e),
        (e = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (t.count++,
          (n = ar.bind(t)),
          e.addEventListener('load', n),
          e.addEventListener('error', n)))
    }
  }
  var ac = 0
  function N0(t, e) {
    return (
      t.stylesheets && t.count === 0 && ir(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (n) {
            var l = setTimeout(function () {
              if ((t.stylesheets && ir(t, t.stylesheets), t.unsuspend)) {
                var u = t.unsuspend
                ;((t.unsuspend = null), u())
              }
            }, 6e4 + e)
            0 < t.imgBytes && ac === 0 && (ac = 62500 * h0())
            var r = setTimeout(
              function () {
                if (
                  ((t.waitingForImages = !1),
                  t.count === 0 &&
                    (t.stylesheets && ir(t, t.stylesheets), t.unsuspend))
                ) {
                  var u = t.unsuspend
                  ;((t.unsuspend = null), u())
                }
              },
              (t.imgBytes > ac ? 50 : 800) + e,
            )
            return (
              (t.unsuspend = n),
              function () {
                ;((t.unsuspend = null), clearTimeout(l), clearTimeout(r))
              }
            )
          }
        : null
    )
  }
  function ar() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) ir(this, this.stylesheets)
      else if (this.unsuspend) {
        var t = this.unsuspend
        ;((this.unsuspend = null), t())
      }
    }
  }
  var lr = null
  function ir(t, e) {
    ;((t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        (lr = new Map()),
        e.forEach(L0, t),
        (lr = null),
        ar.call(t)))
  }
  function L0(t, e) {
    if (!(e.state.loading & 4)) {
      var n = lr.get(t)
      if (n) var l = n.get(null)
      else {
        ;((n = new Map()), lr.set(t, n))
        for (
          var r = t.querySelectorAll(
              'link[data-precedence],style[data-precedence]',
            ),
            u = 0;
          u < r.length;
          u++
        ) {
          var d = r[u]
          ;(d.nodeName === 'LINK' || d.getAttribute('media') !== 'not all') &&
            (n.set(d.dataset.precedence, d), (l = d))
        }
        l && n.set(null, l)
      }
      ;((r = e.instance),
        (d = r.getAttribute('data-precedence')),
        (u = n.get(d) || l),
        u === l && n.set(null, r),
        n.set(d, r),
        this.count++,
        (l = ar.bind(this)),
        r.addEventListener('load', l),
        r.addEventListener('error', l),
        u
          ? u.parentNode.insertBefore(r, u.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(r, t.firstChild)),
        (e.state.loading |= 4))
    }
  }
  var Ri = {
    $$typeof: K,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0,
  }
  function j0(t, e, n, l, r, u, d, y, E) {
    ;((this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = $r(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = $r(0)),
      (this.hiddenUpdates = $r(null)),
      (this.identifierPrefix = l),
      (this.onUncaughtError = r),
      (this.onCaughtError = u),
      (this.onRecoverableError = d),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = E),
      (this.incompleteTransitions = new Map()))
  }
  function Wm(t, e, n, l, r, u, d, y, E, z, H, V) {
    return (
      (t = new j0(t, e, n, d, E, z, H, V, y)),
      (e = 1),
      u === !0 && (e |= 24),
      (u = Se(3, null, null, e)),
      (t.current = u),
      (u.stateNode = t),
      (e = Us()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (u.memoizedState = { element: l, isDehydrated: n, cache: e }),
      qs(u),
      t
    )
  }
  function $m(t) {
    return t ? ((t = Qa), t) : Qa
  }
  function Im(t, e, n, l, r, u) {
    ;((r = $m(r)),
      l.context === null ? (l.context = r) : (l.pendingContext = r),
      (l = Dn(e)),
      (l.payload = { element: n }),
      (u = u === void 0 ? null : u),
      u !== null && (l.callback = u),
      (n = Nn(t, l, e)),
      n !== null && (me(n, t, e), ni(n, t, e)))
  }
  function tp(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var n = t.retryLane
      t.retryLane = n !== 0 && n < e ? n : e
    }
  }
  function lc(t, e) {
    ;(tp(t, e), (t = t.alternate) && tp(t, e))
  }
  function ep(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = ra(t, 67108864)
      ;(e !== null && me(e, t, 67108864), lc(t, 67108864))
    }
  }
  function np(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Te()
      e = Ir(e)
      var n = ra(t, e)
      ;(n !== null && me(n, t, e), lc(t, e))
    }
  }
  var or = !0
  function U0(t, e, n, l) {
    var r = j.T
    j.T = null
    var u = J.p
    try {
      ;((J.p = 2), ic(t, e, n, l))
    } finally {
      ;((J.p = u), (j.T = r))
    }
  }
  function B0(t, e, n, l) {
    var r = j.T
    j.T = null
    var u = J.p
    try {
      ;((J.p = 8), ic(t, e, n, l))
    } finally {
      ;((J.p = u), (j.T = r))
    }
  }
  function ic(t, e, n, l) {
    if (or) {
      var r = oc(l)
      if (r === null) (Qu(t, e, l, rr, n), lp(t, l))
      else if (k0(r, t, e, n, l)) l.stopPropagation()
      else if ((lp(t, l), e & 4 && -1 < H0.indexOf(t))) {
        for (; r !== null; ) {
          var u = La(r)
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var d = na(u.pendingLanes)
                  if (d !== 0) {
                    var y = u
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; d; ) {
                      var E = 1 << (31 - ye(d))
                      ;((y.entanglements[1] |= E), (d &= ~E))
                    }
                    ;(Fe(u), (Ct & 6) === 0 && ((Vo = Tt() + 500), yi(0)))
                  }
                }
                break
              case 31:
              case 13:
                ;((y = ra(u, 2)), y !== null && me(y, u, 2), Qo(), lc(u, 2))
            }
          if (((u = oc(l)), u === null && Qu(t, e, l, rr, n), u === r)) break
          r = u
        }
        r !== null && l.stopPropagation()
      } else Qu(t, e, l, null, n)
    }
  }
  function oc(t) {
    return ((t = ss(t)), rc(t))
  }
  var rr = null
  function rc(t) {
    if (((rr = null), (t = Na(t)), t !== null)) {
      var e = f(t)
      if (e === null) t = null
      else {
        var n = e.tag
        if (n === 13) {
          if (((t = m(e)), t !== null)) return t
          t = null
        } else if (n === 31) {
          if (((t = h(e)), t !== null)) return t
          t = null
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null
          t = null
        } else e !== t && (t = null)
      }
    }
    return ((rr = t), null)
  }
  function ap(t) {
    switch (t) {
      case 'beforetoggle':
      case 'cancel':
      case 'click':
      case 'close':
      case 'contextmenu':
      case 'copy':
      case 'cut':
      case 'auxclick':
      case 'dblclick':
      case 'dragend':
      case 'dragstart':
      case 'drop':
      case 'focusin':
      case 'focusout':
      case 'input':
      case 'invalid':
      case 'keydown':
      case 'keypress':
      case 'keyup':
      case 'mousedown':
      case 'mouseup':
      case 'paste':
      case 'pause':
      case 'play':
      case 'pointercancel':
      case 'pointerdown':
      case 'pointerup':
      case 'ratechange':
      case 'reset':
      case 'resize':
      case 'seeked':
      case 'submit':
      case 'toggle':
      case 'touchcancel':
      case 'touchend':
      case 'touchstart':
      case 'volumechange':
      case 'change':
      case 'selectionchange':
      case 'textInput':
      case 'compositionstart':
      case 'compositionend':
      case 'compositionupdate':
      case 'beforeblur':
      case 'afterblur':
      case 'beforeinput':
      case 'blur':
      case 'fullscreenchange':
      case 'focus':
      case 'hashchange':
      case 'popstate':
      case 'select':
      case 'selectstart':
        return 2
      case 'drag':
      case 'dragenter':
      case 'dragexit':
      case 'dragleave':
      case 'dragover':
      case 'mousemove':
      case 'mouseout':
      case 'mouseover':
      case 'pointermove':
      case 'pointerout':
      case 'pointerover':
      case 'scroll':
      case 'touchmove':
      case 'wheel':
      case 'mouseenter':
      case 'mouseleave':
      case 'pointerenter':
      case 'pointerleave':
        return 8
      case 'message':
        switch (ve()) {
          case jl:
            return 2
          case df:
            return 8
          case Ji:
          case Rg:
            return 32
          case hf:
            return 268435456
          default:
            return 32
        }
      default:
        return 32
    }
  }
  var sc = !1,
    Xn = null,
    Qn = null,
    Zn = null,
    Ti = new Map(),
    Ci = new Map(),
    Kn = [],
    H0 =
      'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset'.split(
        ' ',
      )
  function lp(t, e) {
    switch (t) {
      case 'focusin':
      case 'focusout':
        Xn = null
        break
      case 'dragenter':
      case 'dragleave':
        Qn = null
        break
      case 'mouseover':
      case 'mouseout':
        Zn = null
        break
      case 'pointerover':
      case 'pointerout':
        Ti.delete(e.pointerId)
        break
      case 'gotpointercapture':
      case 'lostpointercapture':
        Ci.delete(e.pointerId)
    }
  }
  function Ai(t, e, n, l, r, u) {
    return t === null || t.nativeEvent !== u
      ? ((t = {
          blockedOn: e,
          domEventName: n,
          eventSystemFlags: l,
          nativeEvent: u,
          targetContainers: [r],
        }),
        e !== null && ((e = La(e)), e !== null && ep(e)),
        t)
      : ((t.eventSystemFlags |= l),
        (e = t.targetContainers),
        r !== null && e.indexOf(r) === -1 && e.push(r),
        t)
  }
  function k0(t, e, n, l, r) {
    switch (e) {
      case 'focusin':
        return ((Xn = Ai(Xn, t, e, n, l, r)), !0)
      case 'dragenter':
        return ((Qn = Ai(Qn, t, e, n, l, r)), !0)
      case 'mouseover':
        return ((Zn = Ai(Zn, t, e, n, l, r)), !0)
      case 'pointerover':
        var u = r.pointerId
        return (Ti.set(u, Ai(Ti.get(u) || null, t, e, n, l, r)), !0)
      case 'gotpointercapture':
        return (
          (u = r.pointerId),
          Ci.set(u, Ai(Ci.get(u) || null, t, e, n, l, r)),
          !0
        )
    }
    return !1
  }
  function ip(t) {
    var e = Na(t.target)
    if (e !== null) {
      var n = f(e)
      if (n !== null) {
        if (((e = n.tag), e === 13)) {
          if (((e = m(n)), e !== null)) {
            ;((t.blockedOn = e),
              bf(t.priority, function () {
                np(n)
              }))
            return
          }
        } else if (e === 31) {
          if (((e = h(n)), e !== null)) {
            ;((t.blockedOn = e),
              bf(t.priority, function () {
                np(n)
              }))
            return
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null
          return
        }
      }
    }
    t.blockedOn = null
  }
  function sr(t) {
    if (t.blockedOn !== null) return !1
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = oc(t.nativeEvent)
      if (n === null) {
        n = t.nativeEvent
        var l = new n.constructor(n.type, n)
        ;((rs = l), n.target.dispatchEvent(l), (rs = null))
      } else return ((e = La(n)), e !== null && ep(e), (t.blockedOn = n), !1)
      e.shift()
    }
    return !0
  }
  function op(t, e, n) {
    sr(t) && n.delete(e)
  }
  function q0() {
    ;((sc = !1),
      Xn !== null && sr(Xn) && (Xn = null),
      Qn !== null && sr(Qn) && (Qn = null),
      Zn !== null && sr(Zn) && (Zn = null),
      Ti.forEach(op),
      Ci.forEach(op))
  }
  function ur(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      sc ||
        ((sc = !0), a.unstable_scheduleCallback(a.unstable_NormalPriority, q0)))
  }
  var cr = null
  function rp(t) {
    cr !== t &&
      ((cr = t),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        cr === t && (cr = null)
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e],
            l = t[e + 1],
            r = t[e + 2]
          if (typeof l != 'function') {
            if (rc(l || n) === null) continue
            break
          }
          var u = La(n)
          u !== null &&
            (t.splice(e, 3),
            (e -= 3),
            ou(u, { pending: !0, data: r, method: n.method, action: l }, l, r))
        }
      }))
  }
  function pl(t) {
    function e(E) {
      return ur(E, t)
    }
    ;(Xn !== null && ur(Xn, t),
      Qn !== null && ur(Qn, t),
      Zn !== null && ur(Zn, t),
      Ti.forEach(e),
      Ci.forEach(e))
    for (var n = 0; n < Kn.length; n++) {
      var l = Kn[n]
      l.blockedOn === t && (l.blockedOn = null)
    }
    for (; 0 < Kn.length && ((n = Kn[0]), n.blockedOn === null); )
      (ip(n), n.blockedOn === null && Kn.shift())
    if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
      for (l = 0; l < n.length; l += 3) {
        var r = n[l],
          u = n[l + 1],
          d = r[se] || null
        if (typeof u == 'function') d || rp(n)
        else if (d) {
          var y = null
          if (u && u.hasAttribute('formAction')) {
            if (((r = u), (d = u[se] || null))) y = d.formAction
            else if (rc(r) !== null) continue
          } else y = d.action
          ;(typeof y == 'function'
            ? (n[l + 1] = y)
            : (n.splice(l, 3), (l -= 3)),
            rp(n))
        }
      }
  }
  function sp() {
    function t(u) {
      u.canIntercept &&
        u.info === 'react-transition' &&
        u.intercept({
          handler: function () {
            return new Promise(function (d) {
              return (r = d)
            })
          },
          focusReset: 'manual',
          scroll: 'manual',
        })
    }
    function e() {
      ;(r !== null && (r(), (r = null)), l || setTimeout(n, 20))
    }
    function n() {
      if (!l && !navigation.transition) {
        var u = navigation.currentEntry
        u &&
          u.url != null &&
          navigation.navigate(u.url, {
            state: u.getState(),
            info: 'react-transition',
            history: 'replace',
          })
      }
    }
    if (typeof navigation == 'object') {
      var l = !1,
        r = null
      return (
        navigation.addEventListener('navigate', t),
        navigation.addEventListener('navigatesuccess', e),
        navigation.addEventListener('navigateerror', e),
        setTimeout(n, 100),
        function () {
          ;((l = !0),
            navigation.removeEventListener('navigate', t),
            navigation.removeEventListener('navigatesuccess', e),
            navigation.removeEventListener('navigateerror', e),
            r !== null && (r(), (r = null)))
        }
      )
    }
  }
  function uc(t) {
    this._internalRoot = t
  }
  ;((fr.prototype.render = uc.prototype.render =
    function (t) {
      var e = this._internalRoot
      if (e === null) throw Error(s(409))
      var n = e.current,
        l = Te()
      Im(n, l, t, e, null, null)
    }),
    (fr.prototype.unmount = uc.prototype.unmount =
      function () {
        var t = this._internalRoot
        if (t !== null) {
          this._internalRoot = null
          var e = t.containerInfo
          ;(Im(t.current, 2, null, t, null, null), Qo(), (e[Da] = null))
        }
      }))
  function fr(t) {
    this._internalRoot = t
  }
  fr.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = yf()
      t = { blockedOn: null, target: t, priority: e }
      for (var n = 0; n < Kn.length && e !== 0 && e < Kn[n].priority; n++);
      ;(Kn.splice(n, 0, t), n === 0 && ip(t))
    }
  }
  var up = o.version
  if (up !== '19.2.3') throw Error(s(527, up, '19.2.3'))
  J.findDOMNode = function (t) {
    var e = t._reactInternals
    if (e === void 0)
      throw typeof t.render == 'function'
        ? Error(s(188))
        : ((t = Object.keys(t).join(',')), Error(s(268, t)))
    return (
      (t = v(e)),
      (t = t !== null ? b(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    )
  }
  var Y0 = {
    bundleType: 0,
    version: '19.2.3',
    rendererPackageName: 'react-dom',
    currentDispatcherRef: j,
    reconcilerVersion: '19.2.3',
  }
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < 'u') {
    var dr = __REACT_DEVTOOLS_GLOBAL_HOOK__
    if (!dr.isDisabled && dr.supportsFiber)
      try {
        ;((Ul = dr.inject(Y0)), (ge = dr))
      } catch {}
  }
  return (
    (Di.createRoot = function (t, e) {
      if (!c(t)) throw Error(s(299))
      var n = !1,
        l = '',
        r = vh,
        u = gh,
        d = yh
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (n = !0),
          e.identifierPrefix !== void 0 && (l = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (r = e.onUncaughtError),
          e.onCaughtError !== void 0 && (u = e.onCaughtError),
          e.onRecoverableError !== void 0 && (d = e.onRecoverableError)),
        (e = Wm(t, 1, !1, null, null, n, l, null, r, u, d, sp)),
        (t[Da] = e.current),
        Xu(t),
        new uc(e)
      )
    }),
    (Di.hydrateRoot = function (t, e, n) {
      if (!c(t)) throw Error(s(299))
      var l = !1,
        r = '',
        u = vh,
        d = gh,
        y = yh,
        E = null
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (l = !0),
          n.identifierPrefix !== void 0 && (r = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (u = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (y = n.onRecoverableError),
          n.formState !== void 0 && (E = n.formState)),
        (e = Wm(t, 1, !0, e, n ?? null, l, r, E, u, d, y, sp)),
        (e.context = $m(null)),
        (n = e.current),
        (l = Te()),
        (l = Ir(l)),
        (r = Dn(l)),
        (r.callback = null),
        Nn(n, r, l),
        (n = l),
        (e.current.lanes = n),
        Hl(e, n),
        Fe(e),
        (t[Da] = e.current),
        Xu(t),
        new fr(e)
      )
    }),
    (Di.version = '19.2.3'),
    Di
  )
}
var Hp
function NS() {
  if (Hp) return Cc.exports
  Hp = 1
  function a() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > 'u' ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != 'function'
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a)
      } catch (o) {
        console.error(o)
      }
  }
  return (a(), (Cc.exports = DS()), Cc.exports)
}
var LS = NS()
const jS = Kc(LS),
  US = function () {
    return null
  },
  Xi = gS({
    component: () =>
      _.jsxs(_.Fragment, { children: [_.jsx(Av, {}), _.jsx(US, {})] }),
  })
function kp(a, o) {
  if (typeof a == 'function') return a(o)
  a != null && (a.current = o)
}
function zl(...a) {
  return (o) => {
    let i = !1
    const s = a.map((c) => {
      const f = kp(c, o)
      return (!i && typeof f == 'function' && (i = !0), f)
    })
    if (i)
      return () => {
        for (let c = 0; c < s.length; c++) {
          const f = s[c]
          typeof f == 'function' ? f() : kp(a[c], null)
        }
      }
  }
}
function Oa(...a) {
  return x.useCallback(zl(...a), a)
}
var BS = Symbol.for('react.lazy'),
  qr = Ic[' use '.trim().toString()]
function HS(a) {
  return typeof a == 'object' && a !== null && 'then' in a
}
function Mv(a) {
  return (
    a != null &&
    typeof a == 'object' &&
    '$$typeof' in a &&
    a.$$typeof === BS &&
    '_payload' in a &&
    HS(a._payload)
  )
}
function Ov(a) {
  const o = qS(a),
    i = x.forwardRef((s, c) => {
      let { children: f, ...m } = s
      Mv(f) && typeof qr == 'function' && (f = qr(f._payload))
      const h = x.Children.toArray(f),
        p = h.find(GS)
      if (p) {
        const v = p.props.children,
          b = h.map((g) =>
            g === p
              ? x.Children.count(v) > 1
                ? x.Children.only(null)
                : x.isValidElement(v)
                  ? v.props.children
                  : null
              : g,
          )
        return _.jsx(o, {
          ...m,
          ref: c,
          children: x.isValidElement(v) ? x.cloneElement(v, void 0, b) : null,
        })
      }
      return _.jsx(o, { ...m, ref: c, children: f })
    })
  return ((i.displayName = `${a}.Slot`), i)
}
var kS = Ov('Slot')
function qS(a) {
  const o = x.forwardRef((i, s) => {
    let { children: c, ...f } = i
    if (
      (Mv(c) && typeof qr == 'function' && (c = qr(c._payload)),
      x.isValidElement(c))
    ) {
      const m = XS(c),
        h = VS(f, c.props)
      return (
        c.type !== x.Fragment && (h.ref = s ? zl(s, m) : m),
        x.cloneElement(c, h)
      )
    }
    return x.Children.count(c) > 1 ? x.Children.only(null) : null
  })
  return ((o.displayName = `${a}.SlotClone`), o)
}
var YS = Symbol('radix.slottable')
function GS(a) {
  return (
    x.isValidElement(a) &&
    typeof a.type == 'function' &&
    '__radixId' in a.type &&
    a.type.__radixId === YS
  )
}
function VS(a, o) {
  const i = { ...o }
  for (const s in o) {
    const c = a[s],
      f = o[s]
    ;/^on[A-Z]/.test(s)
      ? c && f
        ? (i[s] = (...h) => {
            const p = f(...h)
            return (c(...h), p)
          })
        : c && (i[s] = c)
      : s === 'style'
        ? (i[s] = { ...c, ...f })
        : s === 'className' && (i[s] = [c, f].filter(Boolean).join(' '))
  }
  return { ...a, ...i }
}
function XS(a) {
  let o = Object.getOwnPropertyDescriptor(a.props, 'ref')?.get,
    i = o && 'isReactWarning' in o && o.isReactWarning
  return i
    ? a.ref
    : ((o = Object.getOwnPropertyDescriptor(a, 'ref')?.get),
      (i = o && 'isReactWarning' in o && o.isReactWarning),
      i ? a.props.ref : a.props.ref || a.ref)
}
function wv(a) {
  var o,
    i,
    s = ''
  if (typeof a == 'string' || typeof a == 'number') s += a
  else if (typeof a == 'object')
    if (Array.isArray(a)) {
      var c = a.length
      for (o = 0; o < c; o++)
        a[o] && (i = wv(a[o])) && (s && (s += ' '), (s += i))
    } else for (i in a) a[i] && (s && (s += ' '), (s += i))
  return s
}
function zv() {
  for (var a, o, i = 0, s = '', c = arguments.length; i < c; i++)
    (a = arguments[i]) && (o = wv(a)) && (s && (s += ' '), (s += o))
  return s
}
const qp = (a) => (typeof a == 'boolean' ? `${a}` : a === 0 ? '0' : a),
  Yp = zv,
  QS = (a, o) => (i) => {
    var s
    if (o?.variants == null) return Yp(a, i?.class, i?.className)
    const { variants: c, defaultVariants: f } = o,
      m = Object.keys(c).map((v) => {
        const b = i?.[v],
          g = f?.[v]
        if (b === null) return null
        const S = qp(b) || qp(g)
        return c[v][S]
      }),
      h =
        i &&
        Object.entries(i).reduce((v, b) => {
          let [g, S] = b
          return (S === void 0 || (v[g] = S), v)
        }, {}),
      p =
        o == null || (s = o.compoundVariants) === null || s === void 0
          ? void 0
          : s.reduce((v, b) => {
              let { class: g, className: S, ...T } = b
              return Object.entries(T).every((N) => {
                let [M, O] = N
                return Array.isArray(O)
                  ? O.includes({ ...f, ...h }[M])
                  : { ...f, ...h }[M] === O
              })
                ? [...v, g, S]
                : v
            }, [])
    return Yp(a, m, p, i?.class, i?.className)
  },
  ZS = (a, o) => {
    const i = new Array(a.length + o.length)
    for (let s = 0; s < a.length; s++) i[s] = a[s]
    for (let s = 0; s < o.length; s++) i[a.length + s] = o[s]
    return i
  },
  KS = (a, o) => ({ classGroupId: a, validator: o }),
  Dv = (a = new Map(), o = null, i) => ({
    nextPart: a,
    validators: o,
    classGroupId: i,
  }),
  Yr = '-',
  Gp = [],
  PS = 'arbitrary..',
  JS = (a) => {
    const o = WS(a),
      { conflictingClassGroups: i, conflictingClassGroupModifiers: s } = a
    return {
      getClassGroupId: (m) => {
        if (m.startsWith('[') && m.endsWith(']')) return FS(m)
        const h = m.split(Yr),
          p = h[0] === '' && h.length > 1 ? 1 : 0
        return Nv(h, p, o)
      },
      getConflictingClassGroupIds: (m, h) => {
        if (h) {
          const p = s[m],
            v = i[m]
          return p ? (v ? ZS(v, p) : p) : v || Gp
        }
        return i[m] || Gp
      },
    }
  },
  Nv = (a, o, i) => {
    if (a.length - o === 0) return i.classGroupId
    const c = a[o],
      f = i.nextPart.get(c)
    if (f) {
      const v = Nv(a, o + 1, f)
      if (v) return v
    }
    const m = i.validators
    if (m === null) return
    const h = o === 0 ? a.join(Yr) : a.slice(o).join(Yr),
      p = m.length
    for (let v = 0; v < p; v++) {
      const b = m[v]
      if (b.validator(h)) return b.classGroupId
    }
  },
  FS = (a) =>
    a.slice(1, -1).indexOf(':') === -1
      ? void 0
      : (() => {
          const o = a.slice(1, -1),
            i = o.indexOf(':'),
            s = o.slice(0, i)
          return s ? PS + s : void 0
        })(),
  WS = (a) => {
    const { theme: o, classGroups: i } = a
    return $S(i, o)
  },
  $S = (a, o) => {
    const i = Dv()
    for (const s in a) {
      const c = a[s]
      sf(c, i, s, o)
    }
    return i
  },
  sf = (a, o, i, s) => {
    const c = a.length
    for (let f = 0; f < c; f++) {
      const m = a[f]
      IS(m, o, i, s)
    }
  },
  IS = (a, o, i, s) => {
    if (typeof a == 'string') {
      t1(a, o, i)
      return
    }
    if (typeof a == 'function') {
      e1(a, o, i, s)
      return
    }
    n1(a, o, i, s)
  },
  t1 = (a, o, i) => {
    const s = a === '' ? o : Lv(o, a)
    s.classGroupId = i
  },
  e1 = (a, o, i, s) => {
    if (a1(a)) {
      sf(a(s), o, i, s)
      return
    }
    ;(o.validators === null && (o.validators = []), o.validators.push(KS(i, a)))
  },
  n1 = (a, o, i, s) => {
    const c = Object.entries(a),
      f = c.length
    for (let m = 0; m < f; m++) {
      const [h, p] = c[m]
      sf(p, Lv(o, h), i, s)
    }
  },
  Lv = (a, o) => {
    let i = a
    const s = o.split(Yr),
      c = s.length
    for (let f = 0; f < c; f++) {
      const m = s[f]
      let h = i.nextPart.get(m)
      ;(h || ((h = Dv()), i.nextPart.set(m, h)), (i = h))
    }
    return i
  },
  a1 = (a) => 'isThemeGetter' in a && a.isThemeGetter === !0,
  l1 = (a) => {
    if (a < 1) return { get: () => {}, set: () => {} }
    let o = 0,
      i = Object.create(null),
      s = Object.create(null)
    const c = (f, m) => {
      ;((i[f] = m), o++, o > a && ((o = 0), (s = i), (i = Object.create(null))))
    }
    return {
      get(f) {
        let m = i[f]
        if (m !== void 0) return m
        if ((m = s[f]) !== void 0) return (c(f, m), m)
      },
      set(f, m) {
        f in i ? (i[f] = m) : c(f, m)
      },
    }
  },
  Xc = '!',
  Vp = ':',
  i1 = [],
  Xp = (a, o, i, s, c) => ({
    modifiers: a,
    hasImportantModifier: o,
    baseClassName: i,
    maybePostfixModifierPosition: s,
    isExternal: c,
  }),
  o1 = (a) => {
    const { prefix: o, experimentalParseClassName: i } = a
    let s = (c) => {
      const f = []
      let m = 0,
        h = 0,
        p = 0,
        v
      const b = c.length
      for (let M = 0; M < b; M++) {
        const O = c[M]
        if (m === 0 && h === 0) {
          if (O === Vp) {
            ;(f.push(c.slice(p, M)), (p = M + 1))
            continue
          }
          if (O === '/') {
            v = M
            continue
          }
        }
        O === '[' ? m++ : O === ']' ? m-- : O === '(' ? h++ : O === ')' && h--
      }
      const g = f.length === 0 ? c : c.slice(p)
      let S = g,
        T = !1
      g.endsWith(Xc)
        ? ((S = g.slice(0, -1)), (T = !0))
        : g.startsWith(Xc) && ((S = g.slice(1)), (T = !0))
      const N = v && v > p ? v - p : void 0
      return Xp(f, T, S, N)
    }
    if (o) {
      const c = o + Vp,
        f = s
      s = (m) =>
        m.startsWith(c) ? f(m.slice(c.length)) : Xp(i1, !1, m, void 0, !0)
    }
    if (i) {
      const c = s
      s = (f) => i({ className: f, parseClassName: c })
    }
    return s
  },
  r1 = (a) => {
    const o = new Map()
    return (
      a.orderSensitiveModifiers.forEach((i, s) => {
        o.set(i, 1e6 + s)
      }),
      (i) => {
        const s = []
        let c = []
        for (let f = 0; f < i.length; f++) {
          const m = i[f],
            h = m[0] === '[',
            p = o.has(m)
          h || p
            ? (c.length > 0 && (c.sort(), s.push(...c), (c = [])), s.push(m))
            : c.push(m)
        }
        return (c.length > 0 && (c.sort(), s.push(...c)), s)
      }
    )
  },
  s1 = (a) => ({
    cache: l1(a.cacheSize),
    parseClassName: o1(a),
    sortModifiers: r1(a),
    ...JS(a),
  }),
  u1 = /\s+/,
  c1 = (a, o) => {
    const {
        parseClassName: i,
        getClassGroupId: s,
        getConflictingClassGroupIds: c,
        sortModifiers: f,
      } = o,
      m = [],
      h = a.trim().split(u1)
    let p = ''
    for (let v = h.length - 1; v >= 0; v -= 1) {
      const b = h[v],
        {
          isExternal: g,
          modifiers: S,
          hasImportantModifier: T,
          baseClassName: N,
          maybePostfixModifierPosition: M,
        } = i(b)
      if (g) {
        p = b + (p.length > 0 ? ' ' + p : p)
        continue
      }
      let O = !!M,
        U = s(O ? N.substring(0, M) : N)
      if (!U) {
        if (!O) {
          p = b + (p.length > 0 ? ' ' + p : p)
          continue
        }
        if (((U = s(N)), !U)) {
          p = b + (p.length > 0 ? ' ' + p : p)
          continue
        }
        O = !1
      }
      const Q = S.length === 0 ? '' : S.length === 1 ? S[0] : f(S).join(':'),
        K = T ? Q + Xc : Q,
        X = K + U
      if (m.indexOf(X) > -1) continue
      m.push(X)
      const W = c(U, O)
      for (let G = 0; G < W.length; ++G) {
        const Y = W[G]
        m.push(K + Y)
      }
      p = b + (p.length > 0 ? ' ' + p : p)
    }
    return p
  },
  f1 = (...a) => {
    let o = 0,
      i,
      s,
      c = ''
    for (; o < a.length; )
      (i = a[o++]) && (s = jv(i)) && (c && (c += ' '), (c += s))
    return c
  },
  jv = (a) => {
    if (typeof a == 'string') return a
    let o,
      i = ''
    for (let s = 0; s < a.length; s++)
      a[s] && (o = jv(a[s])) && (i && (i += ' '), (i += o))
    return i
  },
  d1 = (a, ...o) => {
    let i, s, c, f
    const m = (p) => {
        const v = o.reduce((b, g) => g(b), a())
        return (
          (i = s1(v)),
          (s = i.cache.get),
          (c = i.cache.set),
          (f = h),
          h(p)
        )
      },
      h = (p) => {
        const v = s(p)
        if (v) return v
        const b = c1(p, i)
        return (c(p, b), b)
      }
    return ((f = m), (...p) => f(f1(...p)))
  },
  h1 = [],
  Ft = (a) => {
    const o = (i) => i[a] || h1
    return ((o.isThemeGetter = !0), o)
  },
  Uv = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  Bv = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  m1 = /^\d+\/\d+$/,
  p1 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  v1 =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  g1 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  y1 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  b1 =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  vl = (a) => m1.test(a),
  ht = (a) => !!a && !Number.isNaN(Number(a)),
  Jn = (a) => !!a && Number.isInteger(Number(a)),
  Oc = (a) => a.endsWith('%') && ht(a.slice(0, -1)),
  bn = (a) => p1.test(a),
  S1 = () => !0,
  x1 = (a) => v1.test(a) && !g1.test(a),
  Hv = () => !1,
  E1 = (a) => y1.test(a),
  _1 = (a) => b1.test(a),
  R1 = (a) => !tt(a) && !et(a),
  T1 = (a) => Dl(a, Yv, Hv),
  tt = (a) => Uv.test(a),
  Sa = (a) => Dl(a, Gv, x1),
  wc = (a) => Dl(a, w1, ht),
  Qp = (a) => Dl(a, kv, Hv),
  C1 = (a) => Dl(a, qv, _1),
  yr = (a) => Dl(a, Vv, E1),
  et = (a) => Bv.test(a),
  Ni = (a) => Nl(a, Gv),
  A1 = (a) => Nl(a, z1),
  Zp = (a) => Nl(a, kv),
  M1 = (a) => Nl(a, Yv),
  O1 = (a) => Nl(a, qv),
  br = (a) => Nl(a, Vv, !0),
  Dl = (a, o, i) => {
    const s = Uv.exec(a)
    return s ? (s[1] ? o(s[1]) : i(s[2])) : !1
  },
  Nl = (a, o, i = !1) => {
    const s = Bv.exec(a)
    return s ? (s[1] ? o(s[1]) : i) : !1
  },
  kv = (a) => a === 'position' || a === 'percentage',
  qv = (a) => a === 'image' || a === 'url',
  Yv = (a) => a === 'length' || a === 'size' || a === 'bg-size',
  Gv = (a) => a === 'length',
  w1 = (a) => a === 'number',
  z1 = (a) => a === 'family-name',
  Vv = (a) => a === 'shadow',
  D1 = () => {
    const a = Ft('color'),
      o = Ft('font'),
      i = Ft('text'),
      s = Ft('font-weight'),
      c = Ft('tracking'),
      f = Ft('leading'),
      m = Ft('breakpoint'),
      h = Ft('container'),
      p = Ft('spacing'),
      v = Ft('radius'),
      b = Ft('shadow'),
      g = Ft('inset-shadow'),
      S = Ft('text-shadow'),
      T = Ft('drop-shadow'),
      N = Ft('blur'),
      M = Ft('perspective'),
      O = Ft('aspect'),
      U = Ft('ease'),
      Q = Ft('animate'),
      K = () => [
        'auto',
        'avoid',
        'all',
        'avoid-page',
        'page',
        'left',
        'right',
        'column',
      ],
      X = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      W = () => [...X(), et, tt],
      G = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      Y = () => ['auto', 'contain', 'none'],
      B = () => [et, tt, p],
      $ = () => [vl, 'full', 'auto', ...B()],
      ut = () => [Jn, 'none', 'subgrid', et, tt],
      st = () => ['auto', { span: ['full', Jn, et, tt] }, Jn, et, tt],
      vt = () => [Jn, 'auto', et, tt],
      Ht = () => ['auto', 'min', 'max', 'fr', et, tt],
      jt = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      At = () => [
        'start',
        'end',
        'center',
        'stretch',
        'center-safe',
        'end-safe',
      ],
      j = () => ['auto', ...B()],
      J = () => [
        vl,
        'auto',
        'full',
        'dvw',
        'dvh',
        'lvw',
        'lvh',
        'svw',
        'svh',
        'min',
        'max',
        'fit',
        ...B(),
      ],
      Z = () => [a, et, tt],
      xt = () => [...X(), Zp, Qp, { position: [et, tt] }],
      Rt = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      C = () => ['auto', 'cover', 'contain', M1, T1, { size: [et, tt] }],
      q = () => [Oc, Ni, Sa],
      P = () => ['', 'none', 'full', v, et, tt],
      F = () => ['', ht, Ni, Sa],
      it = () => ['solid', 'dashed', 'dotted', 'double'],
      rt = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      lt = () => [ht, Oc, Zp, Qp],
      qt = () => ['', 'none', N, et, tt],
      St = () => ['none', ht, et, tt],
      re = () => ['none', ht, et, tt],
      Me = () => [ht, et, tt],
      le = () => [vl, 'full', ...B()]
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [bn],
        breakpoint: [bn],
        color: [S1],
        container: [bn],
        'drop-shadow': [bn],
        ease: ['in', 'out', 'in-out'],
        font: [R1],
        'font-weight': [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ],
        'inset-shadow': [bn],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: [
          'dramatic',
          'near',
          'normal',
          'midrange',
          'distant',
          'none',
        ],
        radius: [bn],
        shadow: [bn],
        spacing: ['px', ht],
        text: [bn],
        'text-shadow': [bn],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', vl, tt, et, O] }],
        container: ['container'],
        columns: [{ columns: [ht, tt, et, h] }],
        'break-after': [{ 'break-after': K() }],
        'break-before': [{ 'break-before': K() }],
        'break-inside': [
          { 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] },
        ],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [
          { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
        ],
        'object-position': [{ object: W() }],
        overflow: [{ overflow: G() }],
        'overflow-x': [{ 'overflow-x': G() }],
        'overflow-y': [{ 'overflow-y': G() }],
        overscroll: [{ overscroll: Y() }],
        'overscroll-x': [{ 'overscroll-x': Y() }],
        'overscroll-y': [{ 'overscroll-y': Y() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: $() }],
        'inset-x': [{ 'inset-x': $() }],
        'inset-y': [{ 'inset-y': $() }],
        start: [{ start: $() }],
        end: [{ end: $() }],
        top: [{ top: $() }],
        right: [{ right: $() }],
        bottom: [{ bottom: $() }],
        left: [{ left: $() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [Jn, 'auto', et, tt] }],
        basis: [{ basis: [vl, 'full', 'auto', h, ...B()] }],
        'flex-direction': [
          { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
        ],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [ht, vl, 'auto', 'initial', 'none', tt] }],
        grow: [{ grow: ['', ht, et, tt] }],
        shrink: [{ shrink: ['', ht, et, tt] }],
        order: [{ order: [Jn, 'first', 'last', 'none', et, tt] }],
        'grid-cols': [{ 'grid-cols': ut() }],
        'col-start-end': [{ col: st() }],
        'col-start': [{ 'col-start': vt() }],
        'col-end': [{ 'col-end': vt() }],
        'grid-rows': [{ 'grid-rows': ut() }],
        'row-start-end': [{ row: st() }],
        'row-start': [{ 'row-start': vt() }],
        'row-end': [{ 'row-end': vt() }],
        'grid-flow': [
          { 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] },
        ],
        'auto-cols': [{ 'auto-cols': Ht() }],
        'auto-rows': [{ 'auto-rows': Ht() }],
        gap: [{ gap: B() }],
        'gap-x': [{ 'gap-x': B() }],
        'gap-y': [{ 'gap-y': B() }],
        'justify-content': [{ justify: [...jt(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...At(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...At()] }],
        'align-content': [{ content: ['normal', ...jt()] }],
        'align-items': [{ items: [...At(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ...At(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': jt() }],
        'place-items': [{ 'place-items': [...At(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...At()] }],
        p: [{ p: B() }],
        px: [{ px: B() }],
        py: [{ py: B() }],
        ps: [{ ps: B() }],
        pe: [{ pe: B() }],
        pt: [{ pt: B() }],
        pr: [{ pr: B() }],
        pb: [{ pb: B() }],
        pl: [{ pl: B() }],
        m: [{ m: j() }],
        mx: [{ mx: j() }],
        my: [{ my: j() }],
        ms: [{ ms: j() }],
        me: [{ me: j() }],
        mt: [{ mt: j() }],
        mr: [{ mr: j() }],
        mb: [{ mb: j() }],
        ml: [{ ml: j() }],
        'space-x': [{ 'space-x': B() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': B() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: J() }],
        w: [{ w: [h, 'screen', ...J()] }],
        'min-w': [{ 'min-w': [h, 'screen', 'none', ...J()] }],
        'max-w': [
          { 'max-w': [h, 'screen', 'none', 'prose', { screen: [m] }, ...J()] },
        ],
        h: [{ h: ['screen', 'lh', ...J()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...J()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...J()] }],
        'font-size': [{ text: ['base', i, Ni, Sa] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [s, et, wc] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              Oc,
              tt,
            ],
          },
        ],
        'font-family': [{ font: [A1, tt, o] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [c, et, tt] }],
        'line-clamp': [{ 'line-clamp': [ht, 'none', et, wc] }],
        leading: [{ leading: [f, ...B()] }],
        'list-image': [{ 'list-image': ['none', et, tt] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', et, tt] }],
        'text-alignment': [
          { text: ['left', 'center', 'right', 'justify', 'start', 'end'] },
        ],
        'placeholder-color': [{ placeholder: Z() }],
        'text-color': [{ text: Z() }],
        'text-decoration': [
          'underline',
          'overline',
          'line-through',
          'no-underline',
        ],
        'text-decoration-style': [{ decoration: [...it(), 'wavy'] }],
        'text-decoration-thickness': [
          { decoration: [ht, 'from-font', 'auto', et, Sa] },
        ],
        'text-decoration-color': [{ decoration: Z() }],
        'underline-offset': [{ 'underline-offset': [ht, 'auto', et, tt] }],
        'text-transform': [
          'uppercase',
          'lowercase',
          'capitalize',
          'normal-case',
        ],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: B() }],
        'vertical-align': [
          {
            align: [
              'baseline',
              'top',
              'middle',
              'bottom',
              'text-top',
              'text-bottom',
              'sub',
              'super',
              et,
              tt,
            ],
          },
        ],
        whitespace: [
          {
            whitespace: [
              'normal',
              'nowrap',
              'pre',
              'pre-line',
              'pre-wrap',
              'break-spaces',
            ],
          },
        ],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', et, tt] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: xt() }],
        'bg-repeat': [{ bg: Rt() }],
        'bg-size': [{ bg: C() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [
                  { to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] },
                  Jn,
                  et,
                  tt,
                ],
                radial: ['', et, tt],
                conic: [Jn, et, tt],
              },
              O1,
              C1,
            ],
          },
        ],
        'bg-color': [{ bg: Z() }],
        'gradient-from-pos': [{ from: q() }],
        'gradient-via-pos': [{ via: q() }],
        'gradient-to-pos': [{ to: q() }],
        'gradient-from': [{ from: Z() }],
        'gradient-via': [{ via: Z() }],
        'gradient-to': [{ to: Z() }],
        rounded: [{ rounded: P() }],
        'rounded-s': [{ 'rounded-s': P() }],
        'rounded-e': [{ 'rounded-e': P() }],
        'rounded-t': [{ 'rounded-t': P() }],
        'rounded-r': [{ 'rounded-r': P() }],
        'rounded-b': [{ 'rounded-b': P() }],
        'rounded-l': [{ 'rounded-l': P() }],
        'rounded-ss': [{ 'rounded-ss': P() }],
        'rounded-se': [{ 'rounded-se': P() }],
        'rounded-ee': [{ 'rounded-ee': P() }],
        'rounded-es': [{ 'rounded-es': P() }],
        'rounded-tl': [{ 'rounded-tl': P() }],
        'rounded-tr': [{ 'rounded-tr': P() }],
        'rounded-br': [{ 'rounded-br': P() }],
        'rounded-bl': [{ 'rounded-bl': P() }],
        'border-w': [{ border: F() }],
        'border-w-x': [{ 'border-x': F() }],
        'border-w-y': [{ 'border-y': F() }],
        'border-w-s': [{ 'border-s': F() }],
        'border-w-e': [{ 'border-e': F() }],
        'border-w-t': [{ 'border-t': F() }],
        'border-w-r': [{ 'border-r': F() }],
        'border-w-b': [{ 'border-b': F() }],
        'border-w-l': [{ 'border-l': F() }],
        'divide-x': [{ 'divide-x': F() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': F() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...it(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...it(), 'hidden', 'none'] }],
        'border-color': [{ border: Z() }],
        'border-color-x': [{ 'border-x': Z() }],
        'border-color-y': [{ 'border-y': Z() }],
        'border-color-s': [{ 'border-s': Z() }],
        'border-color-e': [{ 'border-e': Z() }],
        'border-color-t': [{ 'border-t': Z() }],
        'border-color-r': [{ 'border-r': Z() }],
        'border-color-b': [{ 'border-b': Z() }],
        'border-color-l': [{ 'border-l': Z() }],
        'divide-color': [{ divide: Z() }],
        'outline-style': [{ outline: [...it(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [ht, et, tt] }],
        'outline-w': [{ outline: ['', ht, Ni, Sa] }],
        'outline-color': [{ outline: Z() }],
        shadow: [{ shadow: ['', 'none', b, br, yr] }],
        'shadow-color': [{ shadow: Z() }],
        'inset-shadow': [{ 'inset-shadow': ['none', g, br, yr] }],
        'inset-shadow-color': [{ 'inset-shadow': Z() }],
        'ring-w': [{ ring: F() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: Z() }],
        'ring-offset-w': [{ 'ring-offset': [ht, Sa] }],
        'ring-offset-color': [{ 'ring-offset': Z() }],
        'inset-ring-w': [{ 'inset-ring': F() }],
        'inset-ring-color': [{ 'inset-ring': Z() }],
        'text-shadow': [{ 'text-shadow': ['none', S, br, yr] }],
        'text-shadow-color': [{ 'text-shadow': Z() }],
        opacity: [{ opacity: [ht, et, tt] }],
        'mix-blend': [
          { 'mix-blend': [...rt(), 'plus-darker', 'plus-lighter'] },
        ],
        'bg-blend': [{ 'bg-blend': rt() }],
        'mask-clip': [
          {
            'mask-clip': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
          'mask-no-clip',
        ],
        'mask-composite': [
          { mask: ['add', 'subtract', 'intersect', 'exclude'] },
        ],
        'mask-image-linear-pos': [{ 'mask-linear': [ht] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': lt() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': lt() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': Z() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': Z() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': lt() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': lt() }],
        'mask-image-t-from-color': [{ 'mask-t-from': Z() }],
        'mask-image-t-to-color': [{ 'mask-t-to': Z() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': lt() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': lt() }],
        'mask-image-r-from-color': [{ 'mask-r-from': Z() }],
        'mask-image-r-to-color': [{ 'mask-r-to': Z() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': lt() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': lt() }],
        'mask-image-b-from-color': [{ 'mask-b-from': Z() }],
        'mask-image-b-to-color': [{ 'mask-b-to': Z() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': lt() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': lt() }],
        'mask-image-l-from-color': [{ 'mask-l-from': Z() }],
        'mask-image-l-to-color': [{ 'mask-l-to': Z() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': lt() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': lt() }],
        'mask-image-x-from-color': [{ 'mask-x-from': Z() }],
        'mask-image-x-to-color': [{ 'mask-x-to': Z() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': lt() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': lt() }],
        'mask-image-y-from-color': [{ 'mask-y-from': Z() }],
        'mask-image-y-to-color': [{ 'mask-y-to': Z() }],
        'mask-image-radial': [{ 'mask-radial': [et, tt] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': lt() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': lt() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': Z() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': Z() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [
          {
            'mask-radial': [
              { closest: ['side', 'corner'], farthest: ['side', 'corner'] },
            ],
          },
        ],
        'mask-image-radial-pos': [{ 'mask-radial-at': X() }],
        'mask-image-conic-pos': [{ 'mask-conic': [ht] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': lt() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': lt() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': Z() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': Z() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [
          {
            'mask-origin': [
              'border',
              'padding',
              'content',
              'fill',
              'stroke',
              'view',
            ],
          },
        ],
        'mask-position': [{ mask: xt() }],
        'mask-repeat': [{ mask: Rt() }],
        'mask-size': [{ mask: C() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', et, tt] }],
        filter: [{ filter: ['', 'none', et, tt] }],
        blur: [{ blur: qt() }],
        brightness: [{ brightness: [ht, et, tt] }],
        contrast: [{ contrast: [ht, et, tt] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', T, br, yr] }],
        'drop-shadow-color': [{ 'drop-shadow': Z() }],
        grayscale: [{ grayscale: ['', ht, et, tt] }],
        'hue-rotate': [{ 'hue-rotate': [ht, et, tt] }],
        invert: [{ invert: ['', ht, et, tt] }],
        saturate: [{ saturate: [ht, et, tt] }],
        sepia: [{ sepia: ['', ht, et, tt] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', et, tt] }],
        'backdrop-blur': [{ 'backdrop-blur': qt() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [ht, et, tt] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [ht, et, tt] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', ht, et, tt] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [ht, et, tt] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', ht, et, tt] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [ht, et, tt] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [ht, et, tt] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', ht, et, tt] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': B() }],
        'border-spacing-x': [{ 'border-spacing-x': B() }],
        'border-spacing-y': [{ 'border-spacing-y': B() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [
          {
            transition: [
              '',
              'all',
              'colors',
              'opacity',
              'shadow',
              'transform',
              'none',
              et,
              tt,
            ],
          },
        ],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [ht, 'initial', et, tt] }],
        ease: [{ ease: ['linear', 'initial', U, et, tt] }],
        delay: [{ delay: [ht, et, tt] }],
        animate: [{ animate: ['none', Q, et, tt] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [M, et, tt] }],
        'perspective-origin': [{ 'perspective-origin': W() }],
        rotate: [{ rotate: St() }],
        'rotate-x': [{ 'rotate-x': St() }],
        'rotate-y': [{ 'rotate-y': St() }],
        'rotate-z': [{ 'rotate-z': St() }],
        scale: [{ scale: re() }],
        'scale-x': [{ 'scale-x': re() }],
        'scale-y': [{ 'scale-y': re() }],
        'scale-z': [{ 'scale-z': re() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: Me() }],
        'skew-x': [{ 'skew-x': Me() }],
        'skew-y': [{ 'skew-y': Me() }],
        transform: [{ transform: [et, tt, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: W() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: le() }],
        'translate-x': [{ 'translate-x': le() }],
        'translate-y': [{ 'translate-y': le() }],
        'translate-z': [{ 'translate-z': le() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: Z() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: Z() }],
        'color-scheme': [
          {
            scheme: [
              'normal',
              'dark',
              'light',
              'light-dark',
              'only-dark',
              'only-light',
            ],
          },
        ],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              et,
              tt,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': B() }],
        'scroll-mx': [{ 'scroll-mx': B() }],
        'scroll-my': [{ 'scroll-my': B() }],
        'scroll-ms': [{ 'scroll-ms': B() }],
        'scroll-me': [{ 'scroll-me': B() }],
        'scroll-mt': [{ 'scroll-mt': B() }],
        'scroll-mr': [{ 'scroll-mr': B() }],
        'scroll-mb': [{ 'scroll-mb': B() }],
        'scroll-ml': [{ 'scroll-ml': B() }],
        'scroll-p': [{ 'scroll-p': B() }],
        'scroll-px': [{ 'scroll-px': B() }],
        'scroll-py': [{ 'scroll-py': B() }],
        'scroll-ps': [{ 'scroll-ps': B() }],
        'scroll-pe': [{ 'scroll-pe': B() }],
        'scroll-pt': [{ 'scroll-pt': B() }],
        'scroll-pr': [{ 'scroll-pr': B() }],
        'scroll-pb': [{ 'scroll-pb': B() }],
        'scroll-pl': [{ 'scroll-pl': B() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [
          {
            'will-change': ['auto', 'scroll', 'contents', 'transform', et, tt],
          },
        ],
        fill: [{ fill: ['none', ...Z()] }],
        'stroke-w': [{ stroke: [ht, Ni, Sa, wc] }],
        stroke: [{ stroke: ['none', ...Z()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: [
          'inset-x',
          'inset-y',
          'start',
          'end',
          'top',
          'right',
          'bottom',
          'left',
        ],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': [
          'fvn-ordinal',
          'fvn-slashed-zero',
          'fvn-figure',
          'fvn-spacing',
          'fvn-fraction',
        ],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': [
          'translate',
          'translate-x',
          'translate-y',
          'translate-z',
        ],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    }
  },
  N1 = d1(D1)
function Qe(...a) {
  return N1(zv(a))
}
const L1 = QS(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)
function Ol({
  className: a,
  variant: o = 'default',
  size: i = 'default',
  asChild: s = !1,
  ...c
}) {
  const f = s ? kS : 'button'
  return _.jsx(f, {
    'data-slot': 'button',
    'data-variant': o,
    'data-size': i,
    className: Qe(L1({ variant: o, size: i, className: a })),
    ...c,
  })
}
function xl({ className: a, ...o }) {
  return _.jsx('div', {
    'data-slot': 'card',
    className: Qe(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
      a,
    ),
    ...o,
  })
}
function El({ className: a, ...o }) {
  return _.jsx('div', {
    'data-slot': 'card-header',
    className: Qe(
      '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
      a,
    ),
    ...o,
  })
}
function _l({ className: a, ...o }) {
  return _.jsx('div', {
    'data-slot': 'card-title',
    className: Qe('leading-none font-semibold', a),
    ...o,
  })
}
function Rl({ className: a, ...o }) {
  return _.jsx('div', {
    'data-slot': 'card-content',
    className: Qe('px-6', a),
    ...o,
  })
}
function wl({ className: a, type: o, ...i }) {
  return _.jsx('input', {
    type: o,
    'data-slot': 'input',
    className: Qe(
      'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      a,
    ),
    ...i,
  })
}
var j1 = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  U1 = j1.reduce((a, o) => {
    const i = Ov(`Primitive.${o}`),
      s = x.forwardRef((c, f) => {
        const { asChild: m, ...h } = c,
          p = m ? i : o
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          _.jsx(p, { ...h, ref: f })
        )
      })
    return ((s.displayName = `Primitive.${o}`), { ...a, [o]: s })
  }, {}),
  B1 = 'Label',
  Xv = x.forwardRef((a, o) =>
    _.jsx(U1.label, {
      ...a,
      ref: o,
      onMouseDown: (i) => {
        i.target.closest('button, input, select, textarea') ||
          (a.onMouseDown?.(i),
          !i.defaultPrevented && i.detail > 1 && i.preventDefault())
      },
    }),
  )
Xv.displayName = B1
var H1 = Xv
function Ta({ className: a, ...o }) {
  return _.jsx(H1, {
    'data-slot': 'label',
    className: Qe(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      a,
    ),
    ...o,
  })
}
const k1 = xn('/register')({ component: q1 })
function q1() {
  return _.jsx('div', {
    className: 'flex items-center justify-center min-h-screen bg-gray-100',
    children: _.jsxs(xl, {
      className: 'w-[350px]',
      children: [
        _.jsx(El, { children: _.jsx(_l, { children: 'Register' }) }),
        _.jsx(Rl, {
          children: _.jsxs('form', {
            className: 'space-y-4',
            children: [
              _.jsxs('div', {
                className: 'space-y-2',
                children: [
                  _.jsx(Ta, { htmlFor: 'email', children: 'Email' }),
                  _.jsx(wl, {
                    id: 'email',
                    placeholder: 'm@example.com',
                    type: 'email',
                  }),
                ],
              }),
              _.jsxs('div', {
                className: 'space-y-2',
                children: [
                  _.jsx(Ta, { htmlFor: 'password', children: 'Password' }),
                  _.jsx(wl, { id: 'password', type: 'password' }),
                ],
              }),
              _.jsx(Ol, { className: 'w-full', children: 'Register' }),
            ],
          }),
        }),
      ],
    }),
  })
}
const Y1 = xn('/login')({ component: G1 })
function G1() {
  return _.jsx('div', {
    className: 'flex items-center justify-center min-h-screen bg-gray-100',
    children: _.jsxs(xl, {
      className: 'w-[350px]',
      children: [
        _.jsx(El, { children: _.jsx(_l, { children: 'Login' }) }),
        _.jsx(Rl, {
          children: _.jsxs('form', {
            className: 'space-y-4',
            children: [
              _.jsxs('div', {
                className: 'space-y-2',
                children: [
                  _.jsx(Ta, { htmlFor: 'email', children: 'Email' }),
                  _.jsx(wl, {
                    id: 'email',
                    placeholder: 'm@example.com',
                    type: 'email',
                  }),
                ],
              }),
              _.jsxs('div', {
                className: 'space-y-2',
                children: [
                  _.jsx(Ta, { htmlFor: 'password', children: 'Password' }),
                  _.jsx(wl, { id: 'password', type: 'password' }),
                ],
              }),
              _.jsx(Ol, { className: 'w-full', children: 'Login' }),
            ],
          }),
        }),
      ],
    }),
  })
}
const V1 = xn('/_layout')({ component: X1 })
function X1() {
  return _.jsx('div', { children: 'Hello "/_layout"!' })
}
const Q1 = xn('/')({
  beforeLoad: () => {
    throw fv({ to: '/login' })
  },
})
function ea(a, o, { checkForDefaultPrevented: i = !0 } = {}) {
  return function (c) {
    if ((a?.(c), i === !1 || !c.defaultPrevented)) return o?.(c)
  }
}
function Z1(a, o) {
  const i = x.createContext(o),
    s = (f) => {
      const { children: m, ...h } = f,
        p = x.useMemo(() => h, Object.values(h))
      return _.jsx(i.Provider, { value: p, children: m })
    }
  s.displayName = a + 'Provider'
  function c(f) {
    const m = x.useContext(i)
    if (m) return m
    if (o !== void 0) return o
    throw new Error(`\`${f}\` must be used within \`${a}\``)
  }
  return [s, c]
}
function K1(a, o = []) {
  let i = []
  function s(f, m) {
    const h = x.createContext(m),
      p = i.length
    i = [...i, m]
    const v = (g) => {
      const { scope: S, children: T, ...N } = g,
        M = S?.[a]?.[p] || h,
        O = x.useMemo(() => N, Object.values(N))
      return _.jsx(M.Provider, { value: O, children: T })
    }
    v.displayName = f + 'Provider'
    function b(g, S) {
      const T = S?.[a]?.[p] || h,
        N = x.useContext(T)
      if (N) return N
      if (m !== void 0) return m
      throw new Error(`\`${g}\` must be used within \`${f}\``)
    }
    return [v, b]
  }
  const c = () => {
    const f = i.map((m) => x.createContext(m))
    return function (h) {
      const p = h?.[a] || f
      return x.useMemo(() => ({ [`__scope${a}`]: { ...h, [a]: p } }), [h, p])
    }
  }
  return ((c.scopeName = a), [s, P1(c, ...o)])
}
function P1(...a) {
  const o = a[0]
  if (a.length === 1) return o
  const i = () => {
    const s = a.map((c) => ({ useScope: c(), scopeName: c.scopeName }))
    return function (f) {
      const m = s.reduce((h, { useScope: p, scopeName: v }) => {
        const g = p(f)[`__scope${v}`]
        return { ...h, ...g }
      }, {})
      return x.useMemo(() => ({ [`__scope${o.scopeName}`]: m }), [m])
    }
  }
  return ((i.scopeName = o.scopeName), i)
}
var Yi = globalThis?.document ? x.useLayoutEffect : () => {},
  J1 = Ic[' useId '.trim().toString()] || (() => {}),
  F1 = 0
function zc(a) {
  const [o, i] = x.useState(J1())
  return (
    Yi(() => {
      i((s) => s ?? String(F1++))
    }, [a]),
    a || (o ? `radix-${o}` : '')
  )
}
var W1 = Ic[' useInsertionEffect '.trim().toString()] || Yi
function $1({ prop: a, defaultProp: o, onChange: i = () => {}, caller: s }) {
  const [c, f, m] = I1({ defaultProp: o, onChange: i }),
    h = a !== void 0,
    p = h ? a : c
  {
    const b = x.useRef(a !== void 0)
    x.useEffect(() => {
      const g = b.current
      ;(g !== h &&
        console.warn(
          `${s} is changing from ${g ? 'controlled' : 'uncontrolled'} to ${h ? 'controlled' : 'uncontrolled'}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (b.current = h))
    }, [h, s])
  }
  const v = x.useCallback(
    (b) => {
      if (h) {
        const g = tx(b) ? b(a) : b
        g !== a && m.current?.(g)
      } else f(b)
    },
    [h, a, f, m],
  )
  return [p, v]
}
function I1({ defaultProp: a, onChange: o }) {
  const [i, s] = x.useState(a),
    c = x.useRef(i),
    f = x.useRef(o)
  return (
    W1(() => {
      f.current = o
    }, [o]),
    x.useEffect(() => {
      c.current !== i && (f.current?.(i), (c.current = i))
    }, [i, c]),
    [i, s, f]
  )
}
function tx(a) {
  return typeof a == 'function'
}
function ex(a) {
  const o = nx(a),
    i = x.forwardRef((s, c) => {
      const { children: f, ...m } = s,
        h = x.Children.toArray(f),
        p = h.find(lx)
      if (p) {
        const v = p.props.children,
          b = h.map((g) =>
            g === p
              ? x.Children.count(v) > 1
                ? x.Children.only(null)
                : x.isValidElement(v)
                  ? v.props.children
                  : null
              : g,
          )
        return _.jsx(o, {
          ...m,
          ref: c,
          children: x.isValidElement(v) ? x.cloneElement(v, void 0, b) : null,
        })
      }
      return _.jsx(o, { ...m, ref: c, children: f })
    })
  return ((i.displayName = `${a}.Slot`), i)
}
function nx(a) {
  const o = x.forwardRef((i, s) => {
    const { children: c, ...f } = i
    if (x.isValidElement(c)) {
      const m = ox(c),
        h = ix(f, c.props)
      return (
        c.type !== x.Fragment && (h.ref = s ? zl(s, m) : m),
        x.cloneElement(c, h)
      )
    }
    return x.Children.count(c) > 1 ? x.Children.only(null) : null
  })
  return ((o.displayName = `${a}.SlotClone`), o)
}
var ax = Symbol('radix.slottable')
function lx(a) {
  return (
    x.isValidElement(a) &&
    typeof a.type == 'function' &&
    '__radixId' in a.type &&
    a.type.__radixId === ax
  )
}
function ix(a, o) {
  const i = { ...o }
  for (const s in o) {
    const c = a[s],
      f = o[s]
    ;/^on[A-Z]/.test(s)
      ? c && f
        ? (i[s] = (...h) => {
            const p = f(...h)
            return (c(...h), p)
          })
        : c && (i[s] = c)
      : s === 'style'
        ? (i[s] = { ...c, ...f })
        : s === 'className' && (i[s] = [c, f].filter(Boolean).join(' '))
  }
  return { ...a, ...i }
}
function ox(a) {
  let o = Object.getOwnPropertyDescriptor(a.props, 'ref')?.get,
    i = o && 'isReactWarning' in o && o.isReactWarning
  return i
    ? a.ref
    : ((o = Object.getOwnPropertyDescriptor(a, 'ref')?.get),
      (i = o && 'isReactWarning' in o && o.isReactWarning),
      i ? a.props.ref : a.props.ref || a.ref)
}
var rx = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  Qv = rx.reduce((a, o) => {
    const i = ex(`Primitive.${o}`),
      s = x.forwardRef((c, f) => {
        const { asChild: m, ...h } = c,
          p = m ? i : o
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          _.jsx(p, { ...h, ref: f })
        )
      })
    return ((s.displayName = `Primitive.${o}`), { ...a, [o]: s })
  }, {})
function sx(a, o) {
  a && rf.flushSync(() => a.dispatchEvent(o))
}
function Gi(a) {
  const o = x.useRef(a)
  return (
    x.useEffect(() => {
      o.current = a
    }),
    x.useMemo(
      () =>
        (...i) =>
          o.current?.(...i),
      [],
    )
  )
}
function ux(a, o = globalThis?.document) {
  const i = Gi(a)
  x.useEffect(() => {
    const s = (c) => {
      c.key === 'Escape' && i(c)
    }
    return (
      o.addEventListener('keydown', s, { capture: !0 }),
      () => o.removeEventListener('keydown', s, { capture: !0 })
    )
  }, [i, o])
}
var cx = 'DismissableLayer',
  Qc = 'dismissableLayer.update',
  fx = 'dismissableLayer.pointerDownOutside',
  dx = 'dismissableLayer.focusOutside',
  Kp,
  Zv = x.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Kv = x.forwardRef((a, o) => {
    const {
        disableOutsidePointerEvents: i = !1,
        onEscapeKeyDown: s,
        onPointerDownOutside: c,
        onFocusOutside: f,
        onInteractOutside: m,
        onDismiss: h,
        ...p
      } = a,
      v = x.useContext(Zv),
      [b, g] = x.useState(null),
      S = b?.ownerDocument ?? globalThis?.document,
      [, T] = x.useState({}),
      N = Oa(o, (Y) => g(Y)),
      M = Array.from(v.layers),
      [O] = [...v.layersWithOutsidePointerEventsDisabled].slice(-1),
      U = M.indexOf(O),
      Q = b ? M.indexOf(b) : -1,
      K = v.layersWithOutsidePointerEventsDisabled.size > 0,
      X = Q >= U,
      W = px((Y) => {
        const B = Y.target,
          $ = [...v.branches].some((ut) => ut.contains(B))
        !X || $ || (c?.(Y), m?.(Y), Y.defaultPrevented || h?.())
      }, S),
      G = vx((Y) => {
        const B = Y.target
        ;[...v.branches].some((ut) => ut.contains(B)) ||
          (f?.(Y), m?.(Y), Y.defaultPrevented || h?.())
      }, S)
    return (
      ux((Y) => {
        Q === v.layers.size - 1 &&
          (s?.(Y), !Y.defaultPrevented && h && (Y.preventDefault(), h()))
      }, S),
      x.useEffect(() => {
        if (b)
          return (
            i &&
              (v.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Kp = S.body.style.pointerEvents),
                (S.body.style.pointerEvents = 'none')),
              v.layersWithOutsidePointerEventsDisabled.add(b)),
            v.layers.add(b),
            Pp(),
            () => {
              i &&
                v.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (S.body.style.pointerEvents = Kp)
            }
          )
      }, [b, S, i, v]),
      x.useEffect(
        () => () => {
          b &&
            (v.layers.delete(b),
            v.layersWithOutsidePointerEventsDisabled.delete(b),
            Pp())
        },
        [b, v],
      ),
      x.useEffect(() => {
        const Y = () => T({})
        return (
          document.addEventListener(Qc, Y),
          () => document.removeEventListener(Qc, Y)
        )
      }, []),
      _.jsx(Qv.div, {
        ...p,
        ref: N,
        style: {
          pointerEvents: K ? (X ? 'auto' : 'none') : void 0,
          ...a.style,
        },
        onFocusCapture: ea(a.onFocusCapture, G.onFocusCapture),
        onBlurCapture: ea(a.onBlurCapture, G.onBlurCapture),
        onPointerDownCapture: ea(
          a.onPointerDownCapture,
          W.onPointerDownCapture,
        ),
      })
    )
  })
Kv.displayName = cx
var hx = 'DismissableLayerBranch',
  mx = x.forwardRef((a, o) => {
    const i = x.useContext(Zv),
      s = x.useRef(null),
      c = Oa(o, s)
    return (
      x.useEffect(() => {
        const f = s.current
        if (f)
          return (
            i.branches.add(f),
            () => {
              i.branches.delete(f)
            }
          )
      }, [i.branches]),
      _.jsx(Qv.div, { ...a, ref: c })
    )
  })
mx.displayName = hx
function px(a, o = globalThis?.document) {
  const i = Gi(a),
    s = x.useRef(!1),
    c = x.useRef(() => {})
  return (
    x.useEffect(() => {
      const f = (h) => {
          if (h.target && !s.current) {
            let p = function () {
              Pv(fx, i, v, { discrete: !0 })
            }
            const v = { originalEvent: h }
            h.pointerType === 'touch'
              ? (o.removeEventListener('click', c.current),
                (c.current = p),
                o.addEventListener('click', c.current, { once: !0 }))
              : p()
          } else o.removeEventListener('click', c.current)
          s.current = !1
        },
        m = window.setTimeout(() => {
          o.addEventListener('pointerdown', f)
        }, 0)
      return () => {
        ;(window.clearTimeout(m),
          o.removeEventListener('pointerdown', f),
          o.removeEventListener('click', c.current))
      }
    }, [o, i]),
    { onPointerDownCapture: () => (s.current = !0) }
  )
}
function vx(a, o = globalThis?.document) {
  const i = Gi(a),
    s = x.useRef(!1)
  return (
    x.useEffect(() => {
      const c = (f) => {
        f.target &&
          !s.current &&
          Pv(dx, i, { originalEvent: f }, { discrete: !1 })
      }
      return (
        o.addEventListener('focusin', c),
        () => o.removeEventListener('focusin', c)
      )
    }, [o, i]),
    {
      onFocusCapture: () => (s.current = !0),
      onBlurCapture: () => (s.current = !1),
    }
  )
}
function Pp() {
  const a = new CustomEvent(Qc)
  document.dispatchEvent(a)
}
function Pv(a, o, i, { discrete: s }) {
  const c = i.originalEvent.target,
    f = new CustomEvent(a, { bubbles: !1, cancelable: !0, detail: i })
  ;(o && c.addEventListener(a, o, { once: !0 }),
    s ? sx(c, f) : c.dispatchEvent(f))
}
function gx(a) {
  const o = yx(a),
    i = x.forwardRef((s, c) => {
      const { children: f, ...m } = s,
        h = x.Children.toArray(f),
        p = h.find(Sx)
      if (p) {
        const v = p.props.children,
          b = h.map((g) =>
            g === p
              ? x.Children.count(v) > 1
                ? x.Children.only(null)
                : x.isValidElement(v)
                  ? v.props.children
                  : null
              : g,
          )
        return _.jsx(o, {
          ...m,
          ref: c,
          children: x.isValidElement(v) ? x.cloneElement(v, void 0, b) : null,
        })
      }
      return _.jsx(o, { ...m, ref: c, children: f })
    })
  return ((i.displayName = `${a}.Slot`), i)
}
function yx(a) {
  const o = x.forwardRef((i, s) => {
    const { children: c, ...f } = i
    if (x.isValidElement(c)) {
      const m = Ex(c),
        h = xx(f, c.props)
      return (
        c.type !== x.Fragment && (h.ref = s ? zl(s, m) : m),
        x.cloneElement(c, h)
      )
    }
    return x.Children.count(c) > 1 ? x.Children.only(null) : null
  })
  return ((o.displayName = `${a}.SlotClone`), o)
}
var bx = Symbol('radix.slottable')
function Sx(a) {
  return (
    x.isValidElement(a) &&
    typeof a.type == 'function' &&
    '__radixId' in a.type &&
    a.type.__radixId === bx
  )
}
function xx(a, o) {
  const i = { ...o }
  for (const s in o) {
    const c = a[s],
      f = o[s]
    ;/^on[A-Z]/.test(s)
      ? c && f
        ? (i[s] = (...h) => {
            const p = f(...h)
            return (c(...h), p)
          })
        : c && (i[s] = c)
      : s === 'style'
        ? (i[s] = { ...c, ...f })
        : s === 'className' && (i[s] = [c, f].filter(Boolean).join(' '))
  }
  return { ...a, ...i }
}
function Ex(a) {
  let o = Object.getOwnPropertyDescriptor(a.props, 'ref')?.get,
    i = o && 'isReactWarning' in o && o.isReactWarning
  return i
    ? a.ref
    : ((o = Object.getOwnPropertyDescriptor(a, 'ref')?.get),
      (i = o && 'isReactWarning' in o && o.isReactWarning),
      i ? a.props.ref : a.props.ref || a.ref)
}
var _x = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  Rx = _x.reduce((a, o) => {
    const i = gx(`Primitive.${o}`),
      s = x.forwardRef((c, f) => {
        const { asChild: m, ...h } = c,
          p = m ? i : o
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          _.jsx(p, { ...h, ref: f })
        )
      })
    return ((s.displayName = `Primitive.${o}`), { ...a, [o]: s })
  }, {}),
  Dc = 'focusScope.autoFocusOnMount',
  Nc = 'focusScope.autoFocusOnUnmount',
  Jp = { bubbles: !1, cancelable: !0 },
  Tx = 'FocusScope',
  Jv = x.forwardRef((a, o) => {
    const {
        loop: i = !1,
        trapped: s = !1,
        onMountAutoFocus: c,
        onUnmountAutoFocus: f,
        ...m
      } = a,
      [h, p] = x.useState(null),
      v = Gi(c),
      b = Gi(f),
      g = x.useRef(null),
      S = Oa(o, (M) => p(M)),
      T = x.useRef({
        paused: !1,
        pause() {
          this.paused = !0
        },
        resume() {
          this.paused = !1
        },
      }).current
    ;(x.useEffect(() => {
      if (s) {
        let M = function (K) {
            if (T.paused || !h) return
            const X = K.target
            h.contains(X) ? (g.current = X) : Fn(g.current, { select: !0 })
          },
          O = function (K) {
            if (T.paused || !h) return
            const X = K.relatedTarget
            X !== null && (h.contains(X) || Fn(g.current, { select: !0 }))
          },
          U = function (K) {
            if (document.activeElement === document.body)
              for (const W of K) W.removedNodes.length > 0 && Fn(h)
          }
        ;(document.addEventListener('focusin', M),
          document.addEventListener('focusout', O))
        const Q = new MutationObserver(U)
        return (
          h && Q.observe(h, { childList: !0, subtree: !0 }),
          () => {
            ;(document.removeEventListener('focusin', M),
              document.removeEventListener('focusout', O),
              Q.disconnect())
          }
        )
      }
    }, [s, h, T.paused]),
      x.useEffect(() => {
        if (h) {
          Wp.add(T)
          const M = document.activeElement
          if (!h.contains(M)) {
            const U = new CustomEvent(Dc, Jp)
            ;(h.addEventListener(Dc, v),
              h.dispatchEvent(U),
              U.defaultPrevented ||
                (Cx(zx(Fv(h)), { select: !0 }),
                document.activeElement === M && Fn(h)))
          }
          return () => {
            ;(h.removeEventListener(Dc, v),
              setTimeout(() => {
                const U = new CustomEvent(Nc, Jp)
                ;(h.addEventListener(Nc, b),
                  h.dispatchEvent(U),
                  U.defaultPrevented || Fn(M ?? document.body, { select: !0 }),
                  h.removeEventListener(Nc, b),
                  Wp.remove(T))
              }, 0))
          }
        }
      }, [h, v, b, T]))
    const N = x.useCallback(
      (M) => {
        if ((!i && !s) || T.paused) return
        const O = M.key === 'Tab' && !M.altKey && !M.ctrlKey && !M.metaKey,
          U = document.activeElement
        if (O && U) {
          const Q = M.currentTarget,
            [K, X] = Ax(Q)
          K && X
            ? !M.shiftKey && U === X
              ? (M.preventDefault(), i && Fn(K, { select: !0 }))
              : M.shiftKey &&
                U === K &&
                (M.preventDefault(), i && Fn(X, { select: !0 }))
            : U === Q && M.preventDefault()
        }
      },
      [i, s, T.paused],
    )
    return _.jsx(Rx.div, { tabIndex: -1, ...m, ref: S, onKeyDown: N })
  })
Jv.displayName = Tx
function Cx(a, { select: o = !1 } = {}) {
  const i = document.activeElement
  for (const s of a)
    if ((Fn(s, { select: o }), document.activeElement !== i)) return
}
function Ax(a) {
  const o = Fv(a),
    i = Fp(o, a),
    s = Fp(o.reverse(), a)
  return [i, s]
}
function Fv(a) {
  const o = [],
    i = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (s) => {
        const c = s.tagName === 'INPUT' && s.type === 'hidden'
        return s.disabled || s.hidden || c
          ? NodeFilter.FILTER_SKIP
          : s.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
      },
    })
  for (; i.nextNode(); ) o.push(i.currentNode)
  return o
}
function Fp(a, o) {
  for (const i of a) if (!Mx(i, { upTo: o })) return i
}
function Mx(a, { upTo: o }) {
  if (getComputedStyle(a).visibility === 'hidden') return !0
  for (; a; ) {
    if (o !== void 0 && a === o) return !1
    if (getComputedStyle(a).display === 'none') return !0
    a = a.parentElement
  }
  return !1
}
function Ox(a) {
  return a instanceof HTMLInputElement && 'select' in a
}
function Fn(a, { select: o = !1 } = {}) {
  if (a && a.focus) {
    const i = document.activeElement
    ;(a.focus({ preventScroll: !0 }), a !== i && Ox(a) && o && a.select())
  }
}
var Wp = wx()
function wx() {
  let a = []
  return {
    add(o) {
      const i = a[0]
      ;(o !== i && i?.pause(), (a = $p(a, o)), a.unshift(o))
    },
    remove(o) {
      ;((a = $p(a, o)), a[0]?.resume())
    },
  }
}
function $p(a, o) {
  const i = [...a],
    s = i.indexOf(o)
  return (s !== -1 && i.splice(s, 1), i)
}
function zx(a) {
  return a.filter((o) => o.tagName !== 'A')
}
function Dx(a) {
  const o = Nx(a),
    i = x.forwardRef((s, c) => {
      const { children: f, ...m } = s,
        h = x.Children.toArray(f),
        p = h.find(jx)
      if (p) {
        const v = p.props.children,
          b = h.map((g) =>
            g === p
              ? x.Children.count(v) > 1
                ? x.Children.only(null)
                : x.isValidElement(v)
                  ? v.props.children
                  : null
              : g,
          )
        return _.jsx(o, {
          ...m,
          ref: c,
          children: x.isValidElement(v) ? x.cloneElement(v, void 0, b) : null,
        })
      }
      return _.jsx(o, { ...m, ref: c, children: f })
    })
  return ((i.displayName = `${a}.Slot`), i)
}
function Nx(a) {
  const o = x.forwardRef((i, s) => {
    const { children: c, ...f } = i
    if (x.isValidElement(c)) {
      const m = Bx(c),
        h = Ux(f, c.props)
      return (
        c.type !== x.Fragment && (h.ref = s ? zl(s, m) : m),
        x.cloneElement(c, h)
      )
    }
    return x.Children.count(c) > 1 ? x.Children.only(null) : null
  })
  return ((o.displayName = `${a}.SlotClone`), o)
}
var Lx = Symbol('radix.slottable')
function jx(a) {
  return (
    x.isValidElement(a) &&
    typeof a.type == 'function' &&
    '__radixId' in a.type &&
    a.type.__radixId === Lx
  )
}
function Ux(a, o) {
  const i = { ...o }
  for (const s in o) {
    const c = a[s],
      f = o[s]
    ;/^on[A-Z]/.test(s)
      ? c && f
        ? (i[s] = (...h) => {
            const p = f(...h)
            return (c(...h), p)
          })
        : c && (i[s] = c)
      : s === 'style'
        ? (i[s] = { ...c, ...f })
        : s === 'className' && (i[s] = [c, f].filter(Boolean).join(' '))
  }
  return { ...a, ...i }
}
function Bx(a) {
  let o = Object.getOwnPropertyDescriptor(a.props, 'ref')?.get,
    i = o && 'isReactWarning' in o && o.isReactWarning
  return i
    ? a.ref
    : ((o = Object.getOwnPropertyDescriptor(a, 'ref')?.get),
      (i = o && 'isReactWarning' in o && o.isReactWarning),
      i ? a.props.ref : a.props.ref || a.ref)
}
var Hx = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  kx = Hx.reduce((a, o) => {
    const i = Dx(`Primitive.${o}`),
      s = x.forwardRef((c, f) => {
        const { asChild: m, ...h } = c,
          p = m ? i : o
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          _.jsx(p, { ...h, ref: f })
        )
      })
    return ((s.displayName = `Primitive.${o}`), { ...a, [o]: s })
  }, {}),
  qx = 'Portal',
  Wv = x.forwardRef((a, o) => {
    const { container: i, ...s } = a,
      [c, f] = x.useState(!1)
    Yi(() => f(!0), [])
    const m = i || (c && globalThis?.document?.body)
    return m ? oS.createPortal(_.jsx(kx.div, { ...s, ref: o }), m) : null
  })
Wv.displayName = qx
function Yx(a, o) {
  return x.useReducer((i, s) => o[i][s] ?? i, a)
}
var Kr = (a) => {
  const { present: o, children: i } = a,
    s = Gx(o),
    c =
      typeof i == 'function' ? i({ present: s.isPresent }) : x.Children.only(i),
    f = Oa(s.ref, Vx(c))
  return typeof i == 'function' || s.isPresent
    ? x.cloneElement(c, { ref: f })
    : null
}
Kr.displayName = 'Presence'
function Gx(a) {
  const [o, i] = x.useState(),
    s = x.useRef(null),
    c = x.useRef(a),
    f = x.useRef('none'),
    m = a ? 'mounted' : 'unmounted',
    [h, p] = Yx(m, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' },
    })
  return (
    x.useEffect(() => {
      const v = Sr(s.current)
      f.current = h === 'mounted' ? v : 'none'
    }, [h]),
    Yi(() => {
      const v = s.current,
        b = c.current
      if (b !== a) {
        const S = f.current,
          T = Sr(v)
        ;(a
          ? p('MOUNT')
          : T === 'none' || v?.display === 'none'
            ? p('UNMOUNT')
            : p(b && S !== T ? 'ANIMATION_OUT' : 'UNMOUNT'),
          (c.current = a))
      }
    }, [a, p]),
    Yi(() => {
      if (o) {
        let v
        const b = o.ownerDocument.defaultView ?? window,
          g = (T) => {
            const M = Sr(s.current).includes(CSS.escape(T.animationName))
            if (T.target === o && M && (p('ANIMATION_END'), !c.current)) {
              const O = o.style.animationFillMode
              ;((o.style.animationFillMode = 'forwards'),
                (v = b.setTimeout(() => {
                  o.style.animationFillMode === 'forwards' &&
                    (o.style.animationFillMode = O)
                })))
            }
          },
          S = (T) => {
            T.target === o && (f.current = Sr(s.current))
          }
        return (
          o.addEventListener('animationstart', S),
          o.addEventListener('animationcancel', g),
          o.addEventListener('animationend', g),
          () => {
            ;(b.clearTimeout(v),
              o.removeEventListener('animationstart', S),
              o.removeEventListener('animationcancel', g),
              o.removeEventListener('animationend', g))
          }
        )
      } else p('ANIMATION_END')
    }, [o, p]),
    {
      isPresent: ['mounted', 'unmountSuspended'].includes(h),
      ref: x.useCallback((v) => {
        ;((s.current = v ? getComputedStyle(v) : null), i(v))
      }, []),
    }
  )
}
function Sr(a) {
  return a?.animationName || 'none'
}
function Vx(a) {
  let o = Object.getOwnPropertyDescriptor(a.props, 'ref')?.get,
    i = o && 'isReactWarning' in o && o.isReactWarning
  return i
    ? a.ref
    : ((o = Object.getOwnPropertyDescriptor(a, 'ref')?.get),
      (i = o && 'isReactWarning' in o && o.isReactWarning),
      i ? a.props.ref : a.props.ref || a.ref)
}
function $v(a) {
  const o = Xx(a),
    i = x.forwardRef((s, c) => {
      const { children: f, ...m } = s,
        h = x.Children.toArray(f),
        p = h.find(Zx)
      if (p) {
        const v = p.props.children,
          b = h.map((g) =>
            g === p
              ? x.Children.count(v) > 1
                ? x.Children.only(null)
                : x.isValidElement(v)
                  ? v.props.children
                  : null
              : g,
          )
        return _.jsx(o, {
          ...m,
          ref: c,
          children: x.isValidElement(v) ? x.cloneElement(v, void 0, b) : null,
        })
      }
      return _.jsx(o, { ...m, ref: c, children: f })
    })
  return ((i.displayName = `${a}.Slot`), i)
}
function Xx(a) {
  const o = x.forwardRef((i, s) => {
    const { children: c, ...f } = i
    if (x.isValidElement(c)) {
      const m = Px(c),
        h = Kx(f, c.props)
      return (
        c.type !== x.Fragment && (h.ref = s ? zl(s, m) : m),
        x.cloneElement(c, h)
      )
    }
    return x.Children.count(c) > 1 ? x.Children.only(null) : null
  })
  return ((o.displayName = `${a}.SlotClone`), o)
}
var Qx = Symbol('radix.slottable')
function Zx(a) {
  return (
    x.isValidElement(a) &&
    typeof a.type == 'function' &&
    '__radixId' in a.type &&
    a.type.__radixId === Qx
  )
}
function Kx(a, o) {
  const i = { ...o }
  for (const s in o) {
    const c = a[s],
      f = o[s]
    ;/^on[A-Z]/.test(s)
      ? c && f
        ? (i[s] = (...h) => {
            const p = f(...h)
            return (c(...h), p)
          })
        : c && (i[s] = c)
      : s === 'style'
        ? (i[s] = { ...c, ...f })
        : s === 'className' && (i[s] = [c, f].filter(Boolean).join(' '))
  }
  return { ...a, ...i }
}
function Px(a) {
  let o = Object.getOwnPropertyDescriptor(a.props, 'ref')?.get,
    i = o && 'isReactWarning' in o && o.isReactWarning
  return i
    ? a.ref
    : ((o = Object.getOwnPropertyDescriptor(a, 'ref')?.get),
      (i = o && 'isReactWarning' in o && o.isReactWarning),
      i ? a.props.ref : a.props.ref || a.ref)
}
var Jx = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  Qi = Jx.reduce((a, o) => {
    const i = $v(`Primitive.${o}`),
      s = x.forwardRef((c, f) => {
        const { asChild: m, ...h } = c,
          p = m ? i : o
        return (
          typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0),
          _.jsx(p, { ...h, ref: f })
        )
      })
    return ((s.displayName = `Primitive.${o}`), { ...a, [o]: s })
  }, {}),
  Lc = 0
function Fx() {
  x.useEffect(() => {
    const a = document.querySelectorAll('[data-radix-focus-guard]')
    return (
      document.body.insertAdjacentElement('afterbegin', a[0] ?? Ip()),
      document.body.insertAdjacentElement('beforeend', a[1] ?? Ip()),
      Lc++,
      () => {
        ;(Lc === 1 &&
          document
            .querySelectorAll('[data-radix-focus-guard]')
            .forEach((o) => o.remove()),
          Lc--)
      }
    )
  }, [])
}
function Ip() {
  const a = document.createElement('span')
  return (
    a.setAttribute('data-radix-focus-guard', ''),
    (a.tabIndex = 0),
    (a.style.outline = 'none'),
    (a.style.opacity = '0'),
    (a.style.position = 'fixed'),
    (a.style.pointerEvents = 'none'),
    a
  )
}
var We = function () {
  return (
    (We =
      Object.assign ||
      function (o) {
        for (var i, s = 1, c = arguments.length; s < c; s++) {
          i = arguments[s]
          for (var f in i)
            Object.prototype.hasOwnProperty.call(i, f) && (o[f] = i[f])
        }
        return o
      }),
    We.apply(this, arguments)
  )
}
function Iv(a, o) {
  var i = {}
  for (var s in a)
    Object.prototype.hasOwnProperty.call(a, s) &&
      o.indexOf(s) < 0 &&
      (i[s] = a[s])
  if (a != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var c = 0, s = Object.getOwnPropertySymbols(a); c < s.length; c++)
      o.indexOf(s[c]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(a, s[c]) &&
        (i[s[c]] = a[s[c]])
  return i
}
function Wx(a, o, i) {
  if (i || arguments.length === 2)
    for (var s = 0, c = o.length, f; s < c; s++)
      (f || !(s in o)) &&
        (f || (f = Array.prototype.slice.call(o, 0, s)), (f[s] = o[s]))
  return a.concat(f || Array.prototype.slice.call(o))
}
var Or = 'right-scroll-bar-position',
  wr = 'width-before-scroll-bar',
  $x = 'with-scroll-bars-hidden',
  Ix = '--removed-body-scroll-bar-size'
function jc(a, o) {
  return (typeof a == 'function' ? a(o) : a && (a.current = o), a)
}
function tE(a, o) {
  var i = x.useState(function () {
    return {
      value: a,
      callback: o,
      facade: {
        get current() {
          return i.value
        },
        set current(s) {
          var c = i.value
          c !== s && ((i.value = s), i.callback(s, c))
        },
      },
    }
  })[0]
  return ((i.callback = o), i.facade)
}
var eE = typeof window < 'u' ? x.useLayoutEffect : x.useEffect,
  tv = new WeakMap()
function nE(a, o) {
  var i = tE(null, function (s) {
    return a.forEach(function (c) {
      return jc(c, s)
    })
  })
  return (
    eE(
      function () {
        var s = tv.get(i)
        if (s) {
          var c = new Set(s),
            f = new Set(a),
            m = i.current
          ;(c.forEach(function (h) {
            f.has(h) || jc(h, null)
          }),
            f.forEach(function (h) {
              c.has(h) || jc(h, m)
            }))
        }
        tv.set(i, a)
      },
      [a],
    ),
    i
  )
}
function aE(a) {
  return a
}
function lE(a, o) {
  o === void 0 && (o = aE)
  var i = [],
    s = !1,
    c = {
      read: function () {
        if (s)
          throw new Error(
            'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.',
          )
        return i.length ? i[i.length - 1] : a
      },
      useMedium: function (f) {
        var m = o(f, s)
        return (
          i.push(m),
          function () {
            i = i.filter(function (h) {
              return h !== m
            })
          }
        )
      },
      assignSyncMedium: function (f) {
        for (s = !0; i.length; ) {
          var m = i
          ;((i = []), m.forEach(f))
        }
        i = {
          push: function (h) {
            return f(h)
          },
          filter: function () {
            return i
          },
        }
      },
      assignMedium: function (f) {
        s = !0
        var m = []
        if (i.length) {
          var h = i
          ;((i = []), h.forEach(f), (m = i))
        }
        var p = function () {
            var b = m
            ;((m = []), b.forEach(f))
          },
          v = function () {
            return Promise.resolve().then(p)
          }
        ;(v(),
          (i = {
            push: function (b) {
              ;(m.push(b), v())
            },
            filter: function (b) {
              return ((m = m.filter(b)), i)
            },
          }))
      },
    }
  return c
}
function iE(a) {
  a === void 0 && (a = {})
  var o = lE(null)
  return ((o.options = We({ async: !0, ssr: !1 }, a)), o)
}
var tg = function (a) {
  var o = a.sideCar,
    i = Iv(a, ['sideCar'])
  if (!o)
    throw new Error(
      'Sidecar: please provide `sideCar` property to import the right car',
    )
  var s = o.read()
  if (!s) throw new Error('Sidecar medium not found')
  return x.createElement(s, We({}, i))
}
tg.isSideCarExport = !0
function oE(a, o) {
  return (a.useMedium(o), tg)
}
var eg = iE(),
  Uc = function () {},
  Pr = x.forwardRef(function (a, o) {
    var i = x.useRef(null),
      s = x.useState({
        onScrollCapture: Uc,
        onWheelCapture: Uc,
        onTouchMoveCapture: Uc,
      }),
      c = s[0],
      f = s[1],
      m = a.forwardProps,
      h = a.children,
      p = a.className,
      v = a.removeScrollBar,
      b = a.enabled,
      g = a.shards,
      S = a.sideCar,
      T = a.noRelative,
      N = a.noIsolation,
      M = a.inert,
      O = a.allowPinchZoom,
      U = a.as,
      Q = U === void 0 ? 'div' : U,
      K = a.gapMode,
      X = Iv(a, [
        'forwardProps',
        'children',
        'className',
        'removeScrollBar',
        'enabled',
        'shards',
        'sideCar',
        'noRelative',
        'noIsolation',
        'inert',
        'allowPinchZoom',
        'as',
        'gapMode',
      ]),
      W = S,
      G = nE([i, o]),
      Y = We(We({}, X), c)
    return x.createElement(
      x.Fragment,
      null,
      b &&
        x.createElement(W, {
          sideCar: eg,
          removeScrollBar: v,
          shards: g,
          noRelative: T,
          noIsolation: N,
          inert: M,
          setCallbacks: f,
          allowPinchZoom: !!O,
          lockRef: i,
          gapMode: K,
        }),
      m
        ? x.cloneElement(x.Children.only(h), We(We({}, Y), { ref: G }))
        : x.createElement(Q, We({}, Y, { className: p, ref: G }), h),
    )
  })
Pr.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }
Pr.classNames = { fullWidth: wr, zeroRight: Or }
var rE = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__
}
function sE() {
  if (!document) return null
  var a = document.createElement('style')
  a.type = 'text/css'
  var o = rE()
  return (o && a.setAttribute('nonce', o), a)
}
function uE(a, o) {
  a.styleSheet
    ? (a.styleSheet.cssText = o)
    : a.appendChild(document.createTextNode(o))
}
function cE(a) {
  var o = document.head || document.getElementsByTagName('head')[0]
  o.appendChild(a)
}
var fE = function () {
    var a = 0,
      o = null
    return {
      add: function (i) {
        ;(a == 0 && (o = sE()) && (uE(o, i), cE(o)), a++)
      },
      remove: function () {
        ;(a--,
          !a && o && (o.parentNode && o.parentNode.removeChild(o), (o = null)))
      },
    }
  },
  dE = function () {
    var a = fE()
    return function (o, i) {
      x.useEffect(
        function () {
          return (
            a.add(o),
            function () {
              a.remove()
            }
          )
        },
        [o && i],
      )
    }
  },
  ng = function () {
    var a = dE(),
      o = function (i) {
        var s = i.styles,
          c = i.dynamic
        return (a(s, c), null)
      }
    return o
  },
  hE = { left: 0, top: 0, right: 0, gap: 0 },
  Bc = function (a) {
    return parseInt(a || '', 10) || 0
  },
  mE = function (a) {
    var o = window.getComputedStyle(document.body),
      i = o[a === 'padding' ? 'paddingLeft' : 'marginLeft'],
      s = o[a === 'padding' ? 'paddingTop' : 'marginTop'],
      c = o[a === 'padding' ? 'paddingRight' : 'marginRight']
    return [Bc(i), Bc(s), Bc(c)]
  },
  pE = function (a) {
    if ((a === void 0 && (a = 'margin'), typeof window > 'u')) return hE
    var o = mE(a),
      i = document.documentElement.clientWidth,
      s = window.innerWidth
    return {
      left: o[0],
      top: o[1],
      right: o[2],
      gap: Math.max(0, s - i + o[2] - o[0]),
    }
  },
  vE = ng(),
  Tl = 'data-scroll-locked',
  gE = function (a, o, i, s) {
    var c = a.left,
      f = a.top,
      m = a.right,
      h = a.gap
    return (
      i === void 0 && (i = 'margin'),
      `
  .`
        .concat(
          $x,
          ` {
   overflow: hidden `,
        )
        .concat(
          s,
          `;
   padding-right: `,
        )
        .concat(h, 'px ')
        .concat(
          s,
          `;
  }
  body[`,
        )
        .concat(
          Tl,
          `] {
    overflow: hidden `,
        )
        .concat(
          s,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            o && 'position: relative '.concat(s, ';'),
            i === 'margin' &&
              `
    padding-left: `
                .concat(
                  c,
                  `px;
    padding-top: `,
                )
                .concat(
                  f,
                  `px;
    padding-right: `,
                )
                .concat(
                  m,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(h, 'px ')
                .concat(
                  s,
                  `;
    `,
                ),
            i === 'padding' &&
              'padding-right: '.concat(h, 'px ').concat(s, ';'),
          ]
            .filter(Boolean)
            .join(''),
          `
  }
  
  .`,
        )
        .concat(
          Or,
          ` {
    right: `,
        )
        .concat(h, 'px ')
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(
          wr,
          ` {
    margin-right: `,
        )
        .concat(h, 'px ')
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(Or, ' .')
        .concat(
          Or,
          ` {
    right: 0 `,
        )
        .concat(
          s,
          `;
  }
  
  .`,
        )
        .concat(wr, ' .')
        .concat(
          wr,
          ` {
    margin-right: 0 `,
        )
        .concat(
          s,
          `;
  }
  
  body[`,
        )
        .concat(
          Tl,
          `] {
    `,
        )
        .concat(Ix, ': ')
        .concat(
          h,
          `px;
  }
`,
        )
    )
  },
  ev = function () {
    var a = parseInt(document.body.getAttribute(Tl) || '0', 10)
    return isFinite(a) ? a : 0
  },
  yE = function () {
    x.useEffect(function () {
      return (
        document.body.setAttribute(Tl, (ev() + 1).toString()),
        function () {
          var a = ev() - 1
          a <= 0
            ? document.body.removeAttribute(Tl)
            : document.body.setAttribute(Tl, a.toString())
        }
      )
    }, [])
  },
  bE = function (a) {
    var o = a.noRelative,
      i = a.noImportant,
      s = a.gapMode,
      c = s === void 0 ? 'margin' : s
    yE()
    var f = x.useMemo(
      function () {
        return pE(c)
      },
      [c],
    )
    return x.createElement(vE, { styles: gE(f, !o, c, i ? '' : '!important') })
  },
  Zc = !1
if (typeof window < 'u')
  try {
    var xr = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((Zc = !0), !0)
      },
    })
    ;(window.addEventListener('test', xr, xr),
      window.removeEventListener('test', xr, xr))
  } catch {
    Zc = !1
  }
var gl = Zc ? { passive: !1 } : !1,
  SE = function (a) {
    return a.tagName === 'TEXTAREA'
  },
  ag = function (a, o) {
    if (!(a instanceof Element)) return !1
    var i = window.getComputedStyle(a)
    return (
      i[o] !== 'hidden' &&
      !(i.overflowY === i.overflowX && !SE(a) && i[o] === 'visible')
    )
  },
  xE = function (a) {
    return ag(a, 'overflowY')
  },
  EE = function (a) {
    return ag(a, 'overflowX')
  },
  nv = function (a, o) {
    var i = o.ownerDocument,
      s = o
    do {
      typeof ShadowRoot < 'u' && s instanceof ShadowRoot && (s = s.host)
      var c = lg(a, s)
      if (c) {
        var f = ig(a, s),
          m = f[1],
          h = f[2]
        if (m > h) return !0
      }
      s = s.parentNode
    } while (s && s !== i.body)
    return !1
  },
  _E = function (a) {
    var o = a.scrollTop,
      i = a.scrollHeight,
      s = a.clientHeight
    return [o, i, s]
  },
  RE = function (a) {
    var o = a.scrollLeft,
      i = a.scrollWidth,
      s = a.clientWidth
    return [o, i, s]
  },
  lg = function (a, o) {
    return a === 'v' ? xE(o) : EE(o)
  },
  ig = function (a, o) {
    return a === 'v' ? _E(o) : RE(o)
  },
  TE = function (a, o) {
    return a === 'h' && o === 'rtl' ? -1 : 1
  },
  CE = function (a, o, i, s, c) {
    var f = TE(a, window.getComputedStyle(o).direction),
      m = f * s,
      h = i.target,
      p = o.contains(h),
      v = !1,
      b = m > 0,
      g = 0,
      S = 0
    do {
      if (!h) break
      var T = ig(a, h),
        N = T[0],
        M = T[1],
        O = T[2],
        U = M - O - f * N
      ;(N || U) && lg(a, h) && ((g += U), (S += N))
      var Q = h.parentNode
      h = Q && Q.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? Q.host : Q
    } while ((!p && h !== document.body) || (p && (o.contains(h) || o === h)))
    return (((b && Math.abs(g) < 1) || (!b && Math.abs(S) < 1)) && (v = !0), v)
  },
  Er = function (a) {
    return 'changedTouches' in a
      ? [a.changedTouches[0].clientX, a.changedTouches[0].clientY]
      : [0, 0]
  },
  av = function (a) {
    return [a.deltaX, a.deltaY]
  },
  lv = function (a) {
    return a && 'current' in a ? a.current : a
  },
  AE = function (a, o) {
    return a[0] === o[0] && a[1] === o[1]
  },
  ME = function (a) {
    return `
  .block-interactivity-`
      .concat(
        a,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        a,
        ` {pointer-events: all;}
`,
      )
  },
  OE = 0,
  yl = []
function wE(a) {
  var o = x.useRef([]),
    i = x.useRef([0, 0]),
    s = x.useRef(),
    c = x.useState(OE++)[0],
    f = x.useState(ng)[0],
    m = x.useRef(a)
  ;(x.useEffect(
    function () {
      m.current = a
    },
    [a],
  ),
    x.useEffect(
      function () {
        if (a.inert) {
          document.body.classList.add('block-interactivity-'.concat(c))
          var M = Wx([a.lockRef.current], (a.shards || []).map(lv), !0).filter(
            Boolean,
          )
          return (
            M.forEach(function (O) {
              return O.classList.add('allow-interactivity-'.concat(c))
            }),
            function () {
              ;(document.body.classList.remove(
                'block-interactivity-'.concat(c),
              ),
                M.forEach(function (O) {
                  return O.classList.remove('allow-interactivity-'.concat(c))
                }))
            }
          )
        }
      },
      [a.inert, a.lockRef.current, a.shards],
    ))
  var h = x.useCallback(function (M, O) {
      if (
        ('touches' in M && M.touches.length === 2) ||
        (M.type === 'wheel' && M.ctrlKey)
      )
        return !m.current.allowPinchZoom
      var U = Er(M),
        Q = i.current,
        K = 'deltaX' in M ? M.deltaX : Q[0] - U[0],
        X = 'deltaY' in M ? M.deltaY : Q[1] - U[1],
        W,
        G = M.target,
        Y = Math.abs(K) > Math.abs(X) ? 'h' : 'v'
      if ('touches' in M && Y === 'h' && G.type === 'range') return !1
      var B = window.getSelection(),
        $ = B && B.anchorNode,
        ut = $ ? $ === G || $.contains(G) : !1
      if (ut) return !1
      var st = nv(Y, G)
      if (!st) return !0
      if ((st ? (W = Y) : ((W = Y === 'v' ? 'h' : 'v'), (st = nv(Y, G))), !st))
        return !1
      if (
        (!s.current && 'changedTouches' in M && (K || X) && (s.current = W), !W)
      )
        return !0
      var vt = s.current || W
      return CE(vt, O, M, vt === 'h' ? K : X)
    }, []),
    p = x.useCallback(function (M) {
      var O = M
      if (!(!yl.length || yl[yl.length - 1] !== f)) {
        var U = 'deltaY' in O ? av(O) : Er(O),
          Q = o.current.filter(function (W) {
            return (
              W.name === O.type &&
              (W.target === O.target || O.target === W.shadowParent) &&
              AE(W.delta, U)
            )
          })[0]
        if (Q && Q.should) {
          O.cancelable && O.preventDefault()
          return
        }
        if (!Q) {
          var K = (m.current.shards || [])
              .map(lv)
              .filter(Boolean)
              .filter(function (W) {
                return W.contains(O.target)
              }),
            X = K.length > 0 ? h(O, K[0]) : !m.current.noIsolation
          X && O.cancelable && O.preventDefault()
        }
      }
    }, []),
    v = x.useCallback(function (M, O, U, Q) {
      var K = { name: M, delta: O, target: U, should: Q, shadowParent: zE(U) }
      ;(o.current.push(K),
        setTimeout(function () {
          o.current = o.current.filter(function (X) {
            return X !== K
          })
        }, 1))
    }, []),
    b = x.useCallback(function (M) {
      ;((i.current = Er(M)), (s.current = void 0))
    }, []),
    g = x.useCallback(function (M) {
      v(M.type, av(M), M.target, h(M, a.lockRef.current))
    }, []),
    S = x.useCallback(function (M) {
      v(M.type, Er(M), M.target, h(M, a.lockRef.current))
    }, [])
  x.useEffect(function () {
    return (
      yl.push(f),
      a.setCallbacks({
        onScrollCapture: g,
        onWheelCapture: g,
        onTouchMoveCapture: S,
      }),
      document.addEventListener('wheel', p, gl),
      document.addEventListener('touchmove', p, gl),
      document.addEventListener('touchstart', b, gl),
      function () {
        ;((yl = yl.filter(function (M) {
          return M !== f
        })),
          document.removeEventListener('wheel', p, gl),
          document.removeEventListener('touchmove', p, gl),
          document.removeEventListener('touchstart', b, gl))
      }
    )
  }, [])
  var T = a.removeScrollBar,
    N = a.inert
  return x.createElement(
    x.Fragment,
    null,
    N ? x.createElement(f, { styles: ME(c) }) : null,
    T
      ? x.createElement(bE, { noRelative: a.noRelative, gapMode: a.gapMode })
      : null,
  )
}
function zE(a) {
  for (var o = null; a !== null; )
    (a instanceof ShadowRoot && ((o = a.host), (a = a.host)),
      (a = a.parentNode))
  return o
}
const DE = oE(eg, wE)
var og = x.forwardRef(function (a, o) {
  return x.createElement(Pr, We({}, a, { ref: o, sideCar: DE }))
})
og.classNames = Pr.classNames
var NE = function (a) {
    if (typeof document > 'u') return null
    var o = Array.isArray(a) ? a[0] : a
    return o.ownerDocument.body
  },
  bl = new WeakMap(),
  _r = new WeakMap(),
  Rr = {},
  Hc = 0,
  rg = function (a) {
    return a && (a.host || rg(a.parentNode))
  },
  LE = function (a, o) {
    return o
      .map(function (i) {
        if (a.contains(i)) return i
        var s = rg(i)
        return s && a.contains(s)
          ? s
          : (console.error(
              'aria-hidden',
              i,
              'in not contained inside',
              a,
              '. Doing nothing',
            ),
            null)
      })
      .filter(function (i) {
        return !!i
      })
  },
  jE = function (a, o, i, s) {
    var c = LE(o, Array.isArray(a) ? a : [a])
    Rr[i] || (Rr[i] = new WeakMap())
    var f = Rr[i],
      m = [],
      h = new Set(),
      p = new Set(c),
      v = function (g) {
        !g || h.has(g) || (h.add(g), v(g.parentNode))
      }
    c.forEach(v)
    var b = function (g) {
      !g ||
        p.has(g) ||
        Array.prototype.forEach.call(g.children, function (S) {
          if (h.has(S)) b(S)
          else
            try {
              var T = S.getAttribute(s),
                N = T !== null && T !== 'false',
                M = (bl.get(S) || 0) + 1,
                O = (f.get(S) || 0) + 1
              ;(bl.set(S, M),
                f.set(S, O),
                m.push(S),
                M === 1 && N && _r.set(S, !0),
                O === 1 && S.setAttribute(i, 'true'),
                N || S.setAttribute(s, 'true'))
            } catch (U) {
              console.error('aria-hidden: cannot operate on ', S, U)
            }
        })
    }
    return (
      b(o),
      h.clear(),
      Hc++,
      function () {
        ;(m.forEach(function (g) {
          var S = bl.get(g) - 1,
            T = f.get(g) - 1
          ;(bl.set(g, S),
            f.set(g, T),
            S || (_r.has(g) || g.removeAttribute(s), _r.delete(g)),
            T || g.removeAttribute(i))
        }),
          Hc--,
          Hc ||
            ((bl = new WeakMap()),
            (bl = new WeakMap()),
            (_r = new WeakMap()),
            (Rr = {})))
      }
    )
  },
  UE = function (a, o, i) {
    i === void 0 && (i = 'data-aria-hidden')
    var s = Array.from(Array.isArray(a) ? a : [a]),
      c = NE(a)
    return c
      ? (s.push.apply(s, Array.from(c.querySelectorAll('[aria-live], script'))),
        jE(s, c, i, 'aria-hidden'))
      : function () {
          return null
        }
  },
  Jr = 'Dialog',
  [sg] = K1(Jr),
  [BE, Ze] = sg(Jr),
  ug = (a) => {
    const {
        __scopeDialog: o,
        children: i,
        open: s,
        defaultOpen: c,
        onOpenChange: f,
        modal: m = !0,
      } = a,
      h = x.useRef(null),
      p = x.useRef(null),
      [v, b] = $1({ prop: s, defaultProp: c ?? !1, onChange: f, caller: Jr })
    return _.jsx(BE, {
      scope: o,
      triggerRef: h,
      contentRef: p,
      contentId: zc(),
      titleId: zc(),
      descriptionId: zc(),
      open: v,
      onOpenChange: b,
      onOpenToggle: x.useCallback(() => b((g) => !g), [b]),
      modal: m,
      children: i,
    })
  }
ug.displayName = Jr
var cg = 'DialogTrigger',
  fg = x.forwardRef((a, o) => {
    const { __scopeDialog: i, ...s } = a,
      c = Ze(cg, i),
      f = Oa(o, c.triggerRef)
    return _.jsx(Qi.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': c.open,
      'aria-controls': c.contentId,
      'data-state': ff(c.open),
      ...s,
      ref: f,
      onClick: ea(a.onClick, c.onOpenToggle),
    })
  })
fg.displayName = cg
var uf = 'DialogPortal',
  [HE, dg] = sg(uf, { forceMount: void 0 }),
  hg = (a) => {
    const { __scopeDialog: o, forceMount: i, children: s, container: c } = a,
      f = Ze(uf, o)
    return _.jsx(HE, {
      scope: o,
      forceMount: i,
      children: x.Children.map(s, (m) =>
        _.jsx(Kr, {
          present: i || f.open,
          children: _.jsx(Wv, { asChild: !0, container: c, children: m }),
        }),
      ),
    })
  }
hg.displayName = uf
var Gr = 'DialogOverlay',
  mg = x.forwardRef((a, o) => {
    const i = dg(Gr, a.__scopeDialog),
      { forceMount: s = i.forceMount, ...c } = a,
      f = Ze(Gr, a.__scopeDialog)
    return f.modal
      ? _.jsx(Kr, {
          present: s || f.open,
          children: _.jsx(qE, { ...c, ref: o }),
        })
      : null
  })
mg.displayName = Gr
var kE = $v('DialogOverlay.RemoveScroll'),
  qE = x.forwardRef((a, o) => {
    const { __scopeDialog: i, ...s } = a,
      c = Ze(Gr, i)
    return _.jsx(og, {
      as: kE,
      allowPinchZoom: !0,
      shards: [c.contentRef],
      children: _.jsx(Qi.div, {
        'data-state': ff(c.open),
        ...s,
        ref: o,
        style: { pointerEvents: 'auto', ...s.style },
      }),
    })
  }),
  Ma = 'DialogContent',
  pg = x.forwardRef((a, o) => {
    const i = dg(Ma, a.__scopeDialog),
      { forceMount: s = i.forceMount, ...c } = a,
      f = Ze(Ma, a.__scopeDialog)
    return _.jsx(Kr, {
      present: s || f.open,
      children: f.modal
        ? _.jsx(YE, { ...c, ref: o })
        : _.jsx(GE, { ...c, ref: o }),
    })
  })
pg.displayName = Ma
var YE = x.forwardRef((a, o) => {
    const i = Ze(Ma, a.__scopeDialog),
      s = x.useRef(null),
      c = Oa(o, i.contentRef, s)
    return (
      x.useEffect(() => {
        const f = s.current
        if (f) return UE(f)
      }, []),
      _.jsx(vg, {
        ...a,
        ref: c,
        trapFocus: i.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: ea(a.onCloseAutoFocus, (f) => {
          ;(f.preventDefault(), i.triggerRef.current?.focus())
        }),
        onPointerDownOutside: ea(a.onPointerDownOutside, (f) => {
          const m = f.detail.originalEvent,
            h = m.button === 0 && m.ctrlKey === !0
          ;(m.button === 2 || h) && f.preventDefault()
        }),
        onFocusOutside: ea(a.onFocusOutside, (f) => f.preventDefault()),
      })
    )
  }),
  GE = x.forwardRef((a, o) => {
    const i = Ze(Ma, a.__scopeDialog),
      s = x.useRef(!1),
      c = x.useRef(!1)
    return _.jsx(vg, {
      ...a,
      ref: o,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (f) => {
        ;(a.onCloseAutoFocus?.(f),
          f.defaultPrevented ||
            (s.current || i.triggerRef.current?.focus(), f.preventDefault()),
          (s.current = !1),
          (c.current = !1))
      },
      onInteractOutside: (f) => {
        ;(a.onInteractOutside?.(f),
          f.defaultPrevented ||
            ((s.current = !0),
            f.detail.originalEvent.type === 'pointerdown' && (c.current = !0)))
        const m = f.target
        ;(i.triggerRef.current?.contains(m) && f.preventDefault(),
          f.detail.originalEvent.type === 'focusin' &&
            c.current &&
            f.preventDefault())
      },
    })
  }),
  vg = x.forwardRef((a, o) => {
    const {
        __scopeDialog: i,
        trapFocus: s,
        onOpenAutoFocus: c,
        onCloseAutoFocus: f,
        ...m
      } = a,
      h = Ze(Ma, i),
      p = x.useRef(null),
      v = Oa(o, p)
    return (
      Fx(),
      _.jsxs(_.Fragment, {
        children: [
          _.jsx(Jv, {
            asChild: !0,
            loop: !0,
            trapped: s,
            onMountAutoFocus: c,
            onUnmountAutoFocus: f,
            children: _.jsx(Kv, {
              role: 'dialog',
              id: h.contentId,
              'aria-describedby': h.descriptionId,
              'aria-labelledby': h.titleId,
              'data-state': ff(h.open),
              ...m,
              ref: v,
              onDismiss: () => h.onOpenChange(!1),
            }),
          }),
          _.jsxs(_.Fragment, {
            children: [
              _.jsx(XE, { titleId: h.titleId }),
              _.jsx(ZE, { contentRef: p, descriptionId: h.descriptionId }),
            ],
          }),
        ],
      })
    )
  }),
  cf = 'DialogTitle',
  gg = x.forwardRef((a, o) => {
    const { __scopeDialog: i, ...s } = a,
      c = Ze(cf, i)
    return _.jsx(Qi.h2, { id: c.titleId, ...s, ref: o })
  })
gg.displayName = cf
var yg = 'DialogDescription',
  VE = x.forwardRef((a, o) => {
    const { __scopeDialog: i, ...s } = a,
      c = Ze(yg, i)
    return _.jsx(Qi.p, { id: c.descriptionId, ...s, ref: o })
  })
VE.displayName = yg
var bg = 'DialogClose',
  Sg = x.forwardRef((a, o) => {
    const { __scopeDialog: i, ...s } = a,
      c = Ze(bg, i)
    return _.jsx(Qi.button, {
      type: 'button',
      ...s,
      ref: o,
      onClick: ea(a.onClick, () => c.onOpenChange(!1)),
    })
  })
Sg.displayName = bg
function ff(a) {
  return a ? 'open' : 'closed'
}
var xg = 'DialogTitleWarning',
  [L_, Eg] = Z1(xg, { contentName: Ma, titleName: cf, docsSlug: 'dialog' }),
  XE = ({ titleId: a }) => {
    const o = Eg(xg),
      i = `\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`
    return (
      x.useEffect(() => {
        a && (document.getElementById(a) || console.error(i))
      }, [i, a]),
      null
    )
  },
  QE = 'DialogDescriptionWarning',
  ZE = ({ contentRef: a, descriptionId: o }) => {
    const s = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Eg(QE).contentName}}.`
    return (
      x.useEffect(() => {
        const c = a.current?.getAttribute('aria-describedby')
        o && c && (document.getElementById(o) || console.warn(s))
      }, [s, a, o]),
      null
    )
  },
  KE = ug,
  PE = fg,
  JE = hg,
  FE = mg,
  WE = pg,
  $E = gg,
  IE = Sg
const t_ = (a) => a.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  e_ = (a) =>
    a.replace(/^([A-Z])|[\s-_]+(\w)/g, (o, i, s) =>
      s ? s.toUpperCase() : i.toLowerCase(),
    ),
  iv = (a) => {
    const o = e_(a)
    return o.charAt(0).toUpperCase() + o.slice(1)
  },
  _g = (...a) =>
    a
      .filter((o, i, s) => !!o && o.trim() !== '' && s.indexOf(o) === i)
      .join(' ')
      .trim(),
  n_ = (a) => {
    for (const o in a)
      if (o.startsWith('aria-') || o === 'role' || o === 'title') return !0
  }
var a_ = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
const l_ = x.forwardRef(
  (
    {
      color: a = 'currentColor',
      size: o = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: s,
      className: c = '',
      children: f,
      iconNode: m,
      ...h
    },
    p,
  ) =>
    x.createElement(
      'svg',
      {
        ref: p,
        ...a_,
        width: o,
        height: o,
        stroke: a,
        strokeWidth: s ? (Number(i) * 24) / Number(o) : i,
        className: _g('lucide', c),
        ...(!f && !n_(h) && { 'aria-hidden': 'true' }),
        ...h,
      },
      [
        ...m.map(([v, b]) => x.createElement(v, b)),
        ...(Array.isArray(f) ? f : [f]),
      ],
    ),
)
const i_ = (a, o) => {
  const i = x.forwardRef(({ className: s, ...c }, f) =>
    x.createElement(l_, {
      ref: f,
      iconNode: o,
      className: _g(`lucide-${t_(iv(a))}`, `lucide-${a}`, s),
      ...c,
    }),
  )
  return ((i.displayName = iv(a)), i)
}
const o_ = [
    ['path', { d: 'M18 6 6 18', key: '1bl5f8' }],
    ['path', { d: 'm6 6 12 12', key: 'd8bk6v' }],
  ],
  r_ = i_('x', o_)
function s_({ ...a }) {
  return _.jsx(KE, { 'data-slot': 'dialog', ...a })
}
function u_({ ...a }) {
  return _.jsx(PE, { 'data-slot': 'dialog-trigger', ...a })
}
function c_({ ...a }) {
  return _.jsx(JE, { 'data-slot': 'dialog-portal', ...a })
}
function f_({ className: a, ...o }) {
  return _.jsx(FE, {
    'data-slot': 'dialog-overlay',
    className: Qe(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
      a,
    ),
    ...o,
  })
}
function d_({ className: a, children: o, showCloseButton: i = !0, ...s }) {
  return _.jsxs(c_, {
    'data-slot': 'dialog-portal',
    children: [
      _.jsx(f_, {}),
      _.jsxs(WE, {
        'data-slot': 'dialog-content',
        className: Qe(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg',
          a,
        ),
        ...s,
        children: [
          o,
          i &&
            _.jsxs(IE, {
              'data-slot': 'dialog-close',
              className:
                "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                _.jsx(r_, {}),
                _.jsx('span', { className: 'sr-only', children: 'Close' }),
              ],
            }),
        ],
      }),
    ],
  })
}
function h_({ className: a, ...o }) {
  return _.jsx('div', {
    'data-slot': 'dialog-header',
    className: Qe('flex flex-col gap-2 text-center sm:text-left', a),
    ...o,
  })
}
function m_({ className: a, ...o }) {
  return _.jsx($E, {
    'data-slot': 'dialog-title',
    className: Qe('text-lg leading-none font-semibold', a),
    ...o,
  })
}
async function ji(a, o = {}) {
  const i = localStorage.getItem('activeTenantId'),
    s = {
      'Content-Type': 'application/json',
      ...(i ? { 'x-tenant-id': i } : {}),
      ...o.headers,
    },
    c = await fetch(a, { ...o, headers: s })
  if (!c.ok) throw new Error('API Error')
  return c.json()
}
const Tr = 'http://localhost:3000'
function Cr() {
  return { Authorization: `Bearer ${localStorage.getItem('token')}` }
}
const kc = {
    getAll: () => ji(`${Tr}/tasks`, { headers: Cr() }),
    create: (a) =>
      ji(`${Tr}/tasks`, {
        method: 'POST',
        headers: Cr(),
        body: JSON.stringify(a),
      }),
    update: (a, o) =>
      ji(`${Tr}/tasks/${a}`, {
        method: 'PATCH',
        headers: Cr(),
        body: JSON.stringify(o),
      }),
    delete: (a) => ji(`${Tr}/tasks/${a}`, { method: 'DELETE', headers: Cr() }),
  },
  p_ = xn('/_layout/tasks')({ component: v_ })
function v_() {
  const [a, o] = x.useState([])
  x.useEffect(() => {
    i()
  }, [])
  const i = async () => {
      try {
        const f = await ji('http://localhost:3000/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        o(f)
      } catch (f) {
        console.error('Failed to fetch tasks', f)
      }
    },
    s = async (f) => {
      if (confirm('Are you sure you want to delete this task?'))
        try {
          ;(await kc.delete(f), i())
        } catch (m) {
          console.error('Failed to delete task', m)
        }
    },
    c = async (f, m) => {
      try {
        ;(await kc.update(f, m), i())
      } catch (h) {
        console.error('Failed to update task', h)
      }
    }
  return _.jsxs('div', {
    className: 'p-8',
    children: [
      _.jsxs('div', {
        className: 'flex justify-between items-center mb-6',
        children: [
          _.jsx('h1', { className: 'text-3xl font-bold', children: 'Tasks' }),
          _.jsx(Ol, {
            onClick: () =>
              kc
                .create({ title: 'New Task', description: 'Created via App' })
                .then(i),
            children: 'Quick Add Task',
          }),
        ],
      }),
      _.jsxs('div', {
        className: 'space-y-4',
        children: [
          a.map((f) =>
            _.jsxs(
              xl,
              {
                children: [
                  _.jsxs(El, {
                    className:
                      'flex flex-row items-center justify-between space-y-0 pb-2',
                    children: [
                      _.jsx(_l, {
                        className: 'text-sm font-medium',
                        children: f.title,
                      }),
                      _.jsxs('div', {
                        className: 'flex gap-2',
                        children: [
                          _.jsx(g_, { task: f, onUpdate: c }),
                          _.jsx(Ol, {
                            variant: 'destructive',
                            size: 'sm',
                            onClick: () => s(f.id),
                            children: 'Delete',
                          }),
                        ],
                      }),
                    ],
                  }),
                  _.jsxs(Rl, {
                    children: [
                      _.jsx('p', {
                        className: 'text-sm text-muted-foreground',
                        children: f.description,
                      }),
                      _.jsx('span', {
                        className:
                          'text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block',
                        children: f.status,
                      }),
                    ],
                  }),
                ],
              },
              f.id,
            ),
          ),
          a.length === 0 &&
            _.jsx('p', {
              className: 'text-gray-500',
              children: 'No tasks found for this tenant.',
            }),
        ],
      }),
    ],
  })
}
function g_({ task: a, onUpdate: o }) {
  const [i, s] = x.useState(!1),
    [c, f] = x.useState(a.title),
    [m, h] = x.useState(a.description || ''),
    [p, v] = x.useState(a.status),
    b = (g) => {
      ;(g.preventDefault(),
        o(a.id, { title: c, description: m, status: p }),
        s(!1))
    }
  return _.jsxs(s_, {
    open: i,
    onOpenChange: s,
    children: [
      _.jsx(u_, {
        asChild: !0,
        children: _.jsx(Ol, {
          variant: 'outline',
          size: 'sm',
          children: 'Edit',
        }),
      }),
      _.jsxs(d_, {
        children: [
          _.jsx(h_, { children: _.jsx(m_, { children: 'Edit Task' }) }),
          _.jsxs('form', {
            onSubmit: b,
            className: 'space-y-4',
            children: [
              _.jsxs('div', {
                children: [
                  _.jsx(Ta, { children: 'Title' }),
                  _.jsx(wl, { value: c, onChange: (g) => f(g.target.value) }),
                ],
              }),
              _.jsxs('div', {
                children: [
                  _.jsx(Ta, { children: 'Description' }),
                  _.jsx(wl, { value: m, onChange: (g) => h(g.target.value) }),
                ],
              }),
              _.jsxs('div', {
                children: [
                  _.jsx(Ta, { children: 'Status' }),
                  _.jsxs('select', {
                    className:
                      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    value: p,
                    onChange: (g) => v(g.target.value),
                    children: [
                      _.jsx('option', { value: 'TODO', children: 'TODO' }),
                      _.jsx('option', {
                        value: 'IN_PROGRESS',
                        children: 'IN_PROGRESS',
                      }),
                      _.jsx('option', { value: 'DONE', children: 'DONE' }),
                    ],
                  }),
                ],
              }),
              _.jsx(Ol, { type: 'submit', children: 'Save Changes' }),
            ],
          }),
        ],
      }),
    ],
  })
}
const y_ = xn('/_layout/settings')({ component: b_ })
function b_() {
  return _.jsx('div', { children: 'Hello "/_layout/settings"!' })
}
const S_ = xn('/_layout/dashboard')({ component: x_ })
function x_() {
  return _.jsxs('div', {
    className: 'p-8',
    children: [
      _.jsx('h1', {
        className: 'text-3xl font-bold mb-6',
        children: 'Dashboard',
      }),
      _.jsxs('div', {
        className: 'grid grid-cols-1 md:grid-cols-3 gap-6',
        children: [
          _.jsxs(xl, {
            children: [
              _.jsx(El, { children: _.jsx(_l, { children: 'Total Tasks' }) }),
              _.jsx(Rl, {
                children: _.jsx('p', {
                  className: 'text-4xl font-bold',
                  children: '12',
                }),
              }),
            ],
          }),
          _.jsxs(xl, {
            children: [
              _.jsx(El, { children: _.jsx(_l, { children: 'In Progress' }) }),
              _.jsx(Rl, {
                children: _.jsx('p', {
                  className: 'text-4xl font-bold',
                  children: '5',
                }),
              }),
            ],
          }),
          _.jsxs(xl, {
            children: [
              _.jsx(El, { children: _.jsx(_l, { children: 'Completed' }) }),
              _.jsx(Rl, {
                children: _.jsx('p', {
                  className: 'text-4xl font-bold',
                  children: '7',
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  })
}
const E_ = k1.update({
    id: '/register',
    path: '/register',
    getParentRoute: () => Xi,
  }),
  __ = Y1.update({ id: '/login', path: '/login', getParentRoute: () => Xi }),
  Fr = V1.update({ id: '/_layout', getParentRoute: () => Xi }),
  R_ = Q1.update({ id: '/', path: '/', getParentRoute: () => Xi }),
  T_ = p_.update({ id: '/tasks', path: '/tasks', getParentRoute: () => Fr }),
  C_ = y_.update({
    id: '/settings',
    path: '/settings',
    getParentRoute: () => Fr,
  }),
  A_ = S_.update({
    id: '/dashboard',
    path: '/dashboard',
    getParentRoute: () => Fr,
  }),
  M_ = {
    LayoutDashboardRoute: A_,
    LayoutSettingsRoute: C_,
    LayoutTasksRoute: T_,
  },
  O_ = Fr._addFileChildren(M_),
  w_ = { IndexRoute: R_, LayoutRoute: O_, LoginRoute: __, RegisterRoute: E_ },
  z_ = Xi._addFileChildren(w_)._addFileTypes(),
  D_ = CS({
    routeTree: z_,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: !0,
    defaultStructuralSharing: !0,
    defaultPreloadStaleTime: 0,
  }),
  qc = document.getElementById('app')
qc &&
  !qc.innerHTML &&
  jS
    .createRoot(qc)
    .render(_.jsx(x.StrictMode, { children: _.jsx(OS, { router: D_ }) }))
