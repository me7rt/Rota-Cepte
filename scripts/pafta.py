import json,os
from PIL import Image,ImageDraw,ImageFont
F=json.load(open('out/foto.json'));os.makedirs('out/pafta',exist_ok=True)
try: fn=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14); fb=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
except: fn=fb=ImageFont.load_default()
for x in F:
  n=len(x['aday']); 
  if not n: continue
  cols=4; rows=(n+cols-1)//cols; W,H=300,230
  im=Image.new('RGB',(cols*W,rows*(H+22)+34),'white'); d=ImageDraw.Draw(im)
  d.text((6,6),f"{x['ad']} / {x['ilce']} / {x['il']}",fill='black',font=fb)
  for i,c in enumerate(x['aday']):
    X=(i%cols)*W; Y=34+(i//cols)*(H+22)
    p=f"out/k/{x['q']}-{i}.jpg"
    if os.path.exists(p):
      try:
        t=Image.open(p).convert('RGB'); t.thumbnail((W-6,H-6)); im.paste(t,(X+3,Y+3))
      except Exception: pass
    d.text((X+4,Y+H+2),f"#{i} {c['kay']} {c['km'] if c['km'] is not None else ''}",fill='red',font=fn)
  im.save(f"out/pafta/{x['q']}.jpg",quality=80)
