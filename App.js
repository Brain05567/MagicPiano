import React,{useEffect,useRef,useState} from 'react';
import {View,Text,Pressable,ScrollView,Dimensions,StatusBar,StyleSheet} from 'react-native';
import {createAudioPlayer,setAudioModeAsync} from 'expo-audio';
import * as FS from 'expo-file-system/legacy';
import {SONGS,LEVELS} from './songs';

const COL=['#4caf50','#ffc107','#ff9800','#f44336','#b71c1c'];
const NN={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const midi=n=>{const m=n.match(/^([A-G])([#b]?)(\d)$/);return 12*(+m[3]+1)+NN[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0)};

function parse(song){
  const sec=60/song.bpm;let t=0;const ev=[];
  for(const part of song.s){const [p,r]=part.split('*');
    for(let k=0;k<(+r||1);k++)for(const tok of p.trim().split(/\s+/)){
      const [ns,d]=tok.split(':');const dur=d?+d:1;
      if(ns!=='-')ev.push({t:t*sec,dur,m:ns.split('+').slice(0,2).map(midi)}); // max 2 touches
      t+=dur;}}
  const all=ev.flatMap(e=>e.m),lo=Math.min(...all),hi=Math.max(...all),tiles=[];
  ev.forEach(e=>{const used=[];e.m.forEach(m=>{
    let c=Math.min(3,Math.floor((m-lo)/(hi-lo+1)*4));while(used.includes(c))c=(c+1)%4;used.push(c);
    tiles.push({t:e.t,m,c,hf:Math.min(Math.max(e.dur*sec*song.spd*.92,.05),.25),hit:false});});});
  return tiles;
}

// Synthèse d'un son de piano (harmoniques à décroissance) -> WAV
function wav(m){const SR=22050,n=SR*2,f=440*2**((m-69)/12),d=new Uint8Array(44+n*2),v=new DataView(d.buffer);
  const s4=(o,s)=>[...s].forEach((c,i)=>d[o+i]=c.charCodeAt(0));
  s4(0,'RIFF');v.setUint32(4,36+n*2,true);s4(8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);
  v.setUint32(24,SR,true);v.setUint32(28,SR*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);s4(36,'data');v.setUint32(40,n*2,true);
  for(let i=0;i<n;i++){const t=i/SR;let x=0;
    for(let h=1;h<=6;h++)if(f*h<SR/2)x+=Math.sin(6.2832*f*h*t)*Math.exp(-t*(1.2+h*1.3))/h;
    x*=(1-Math.exp(-t*300))*(i>n-2000?(n-i)/2000:1);v.setInt16(44+i*2,x*9000,true);}
  return d;}
const A='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function b64(u){let o='';for(let i=0;i<u.length;i+=3){const a=u[i],b=u[i+1]??0,c=u[i+2]??0;
  o+=A[a>>2]+A[(a&3)<<4|b>>4]+(i+1<u.length?A[(b&15)<<2|c>>6]:'=')+(i+2<u.length?A[c&63]:'=');}return o;}

export default function App(){
  const {width:W,height:H}=Dimensions.get('window');
  const G=useRef({snd:{},tiles:[],t0:0,score:0,over:true,song:null}).current;
  const [scr,setScr]=useState('menu');const [,tick]=useState(0);
  useEffect(()=>{setAudioModeAsync({playsInSilentMode:true}).catch(()=>{});},[]);

  const now=()=>(performance.now()-G.t0)/1000;
  const yb=t=>H*.78-(t.t-now())*G.song.spd*H;     // bas de la tuile
  const play=m=>{const p=G.snd[m];if(p){try{p.seekTo(0);p.play();}catch(e){}}};

  async function start(s){
    setScr('load');G.song=s;const tiles=parse(s);
    for(const m of new Set(tiles.map(t=>t.m))){
      if(!G.snd[m]){const uri=FS.cacheDirectory+`n${m}.wav`;
        if(!(await FS.getInfoAsync(uri)).exists)await FS.writeAsStringAsync(uri,b64(wav(m)),{encoding:'base64'});
        G.snd[m]=createAudioPlayer({uri});}}
    G.tiles=tiles;G.score=0;G.over=false;G.t0=performance.now()+2000;setScr('play');
  }
  const end=r=>{G.over=true;setScr(r);};

  useEffect(()=>{if(scr!=='play')return;let id;
    const f=()=>{if(G.over)return;
      for(const t of G.tiles)if(!t.hit&&yb(t)-t.hf*H>H){end('over');return;}
      tick(x=>x+1);id=requestAnimationFrame(f);};
    id=requestAnimationFrame(f);return()=>cancelAnimationFrame(id);},[scr]);

  const tap=c=>{if(G.over)return;
    const t=G.tiles.find(t=>!t.hit&&t.c===c);
    if(!t||yb(t)<H*.12){end('over');return;}   // touche dans le vide = perdu
    t.hit=true;G.score++;play(t.m);
    if(G.tiles.every(x=>x.hit))setTimeout(()=>end('win'),600);};

  if(scr==='menu')return(
    <View style={S.bg}><StatusBar barStyle="light-content"/>
      <Text style={S.title}>🎹 Magic Piano</Text>
      <ScrollView contentContainerStyle={{padding:16}}>
        {SONGS.map(s=>(<Pressable key={s.n} onPress={()=>start(s)} style={[S.card,{borderColor:COL[s.lv]}]}>
          <Text style={S.sn}>{s.n}</Text><Text style={S.sa}>{s.a}</Text>
          <Text style={[S.lv,{color:COL[s.lv]}]}>{LEVELS[s.lv]}</Text></Pressable>))}
      </ScrollView></View>);
  if(scr==='load')return<View style={[S.bg,{justifyContent:'center'}]}><Text style={S.title}>Chargement des notes…</Text></View>;
  if(scr==='over'||scr==='win')return(
    <View style={[S.bg,{justifyContent:'center'}]}>
      <Text style={S.title}>{scr==='win'?'🎉 Bravo !':'💥 Raté'}</Text>
      <Text style={[S.sa,{textAlign:'center',fontSize:22}]}>{G.score} / {G.tiles.length} tuiles</Text>
      <Pressable style={S.btn} onPress={()=>start(G.song)}><Text style={S.sn}>Rejouer</Text></Pressable>
      <Pressable style={S.btn} onPress={()=>setScr('menu')}><Text style={S.sn}>Menu</Text></Pressable></View>);

  const cw=W/4;
  return(<View style={{flex:1,backgroundColor:'#fff'}}><StatusBar hidden/>
    <View style={{flex:1,flexDirection:'row'}}>
      {[0,1,2,3].map(c=><Pressable key={c} onPressIn={()=>tap(c)} style={{width:cw,borderRightWidth:1,borderColor:'#ddd'}}/>)}
    </View>
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {G.tiles.map((t,i)=>{if(t.hit)return null;const b=yb(t),h=t.hf*H;if(b<0||b-h>H)return null;
        return<View key={i} style={{position:'absolute',left:t.c*cw+2,top:b-h,width:cw-4,height:h-3,backgroundColor:'#111',borderRadius:8}}/>;})}
      <View style={{position:'absolute',top:H*.78,width:W,height:2,backgroundColor:'#e91e63'}}/>
      <Text style={S.score}>{G.score}</Text></View></View>);
}
const S=StyleSheet.create({
  bg:{flex:1,backgroundColor:'#111',paddingTop:60},title:{color:'#fff',fontSize:30,fontWeight:'800',textAlign:'center',marginBottom:10},
  card:{borderWidth:2,borderRadius:14,padding:14,marginBottom:12,backgroundColor:'#1d1d1d'},
  sn:{color:'#fff',fontSize:18,fontWeight:'700',textAlign:'center'},sa:{color:'#aaa',fontSize:14},lv:{fontWeight:'800',marginTop:4},
  btn:{margin:12,padding:16,borderRadius:14,backgroundColor:'#333'},
  score:{position:'absolute',top:50,alignSelf:'center',fontSize:48,fontWeight:'800',color:'#e91e63'}});
