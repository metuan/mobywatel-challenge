import { sx } from '@/lib/sx';
import { I } from '@/ui/icons';
import { Av, AvStack, GRow, Label, Lead } from '@/ui/primitives';
import type { Ctx } from '@/types';

export function Family(c: Ctx) {
  const fam = [
    ['A', 'Anna', 'Ty', 'Dowód do 2031', '', 'profile', 'ok'],
    ['Z', 'Zosia', 'Córka, 6 lat', 'Paszport · 41 dni', 'red', 'member-zosia', ''],
    ...(c.s.babyDone ? [['J', 'Julia', 'Córka, 9 dni', '800+ w drodze', '', 'baby-done', '']] : []),
    ['T', 'Tomasz', 'Partner', 'Wspólne sprawy', '', 'member-tomasz', ''],
    ['S', 'Stanisław', 'Tata', 'Dostęp do 2027', '', 'member-tata', 'key'],
  ];
  return (
    <div>
      <h1 className="h-xl">Bliscy</h1>
      <div className="fhead">
        <AvStack size={32} />
        <span>{fam.length} osoby · 1 sprawa wymaga uwagi</span>
      </div>
      <div className="glist">
        {fam.map(([i, n, r, f, red, go, k]) => (
          <button className="grow tall" onClick={() => c.go(go)}>
            <Av i={i} size={44} />
            <span className="gtx">
              <span className="gt h">
                {n}
                {k === 'key' && (
                  <span className="keyi" title="Masz pełnomocnictwo">
                    {I('key', 14)}
                  </span>
                )}
              </span>
              <span className="gs">{r}</span>
            </span>
            <span className={'gv' + (red ? ' red' : '')}>{f}</span>
            <span className="gch">{I('chevron', 16)}</span>
          </button>
        ))}
        <button className="grow" onClick={() => c.go('invite')}>
          <Lead ic="plus" />
          <span className="gtx">
            <span className="gt">Dodaj osobę</span>
          </span>
        </button>
      </div>
      <Label t="Wspólne" />
      <div className="glist">
        <GRow ic="list" t="Kalendarz rodziny" v="7 terminów" onClick={() => c.go('calendar')} />
        <GRow ic="pin" t="Gdzie jest rodzina" s="Tylko podczas alarmu" onClick={() => c.go('family-map')} />
        <GRow ic="shield" t="Plan kryzysowy" v="2 miejsca" onClick={() => c.go('plan')} />
        <GRow ic="lock" t="Uprawnienia" s="Kto co widzi i do kiedy" onClick={() => c.go('consents')} />
      </div>
    </div>
  );
}

export function Fam({
  who,
  st,
  tone,
}: {
  who: 'anna' | 'zosia' | 'tomasz' | 'tata';
  st: string;
  tone: string;
}) {
  const p = {
    anna: ['AN', '#22408f', 'Ty'],
    zosia: ['ZN', '#b0533f', 'Zosia'],
    tomasz: ['TN', '#3d5a80', 'Tomasz'],
    tata: ['SN', '#1c7a4c', 'Tata'],
  }[who];
  return (
    <div className="lfam">
      <span className="av" style={sx('background:' + p[1])}>
        {p[0]}
        <i className={'st ' + tone}></i>
      </span>
      <span className="nm">{p[2]}</span>
      <span className="ss">{st}</span>
    </div>
  );
}
