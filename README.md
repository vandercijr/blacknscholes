# blacknscholes
Implementation of the Black-Scholes market pricing model for an asset

Calls	Puts
delta	{\displaystyle {\frac {\partial C}{\partial S}}}{\displaystyle {\frac {\partial C}{\partial S}}}	{\displaystyle N(d_{1})\,}{\displaystyle N(d_{1})\,}	{\displaystyle -N(-d_{1})=N(d_{1})-1\,}{\displaystyle -N(-d_{1})=N(d_{1})-1\,}
gamma	{\displaystyle {\frac {\partial ^{2}C}{\partial S^{2}}}}{\displaystyle {\frac {\partial ^{2}C}{\partial S^{2}}}}	{\displaystyle {\frac {N'(d_{1})}{S\sigma {\sqrt {T-t}}}}\,}{\displaystyle {\frac {N'(d_{1})}{S\sigma {\sqrt {T-t}}}}\,}
vega	{\displaystyle {\frac {\partial C}{\partial \sigma }}}{\displaystyle {\frac {\partial C}{\partial \sigma }}}	{\displaystyle SN'(d_{1}){\sqrt {T-t}}\,}{\displaystyle SN'(d_{1}){\sqrt {T-t}}\,}
theta	{\displaystyle -{\frac {\partial C}{\partial t}}}{\displaystyle -{\frac {\partial C}{\partial t}}}	{\displaystyle -{\frac {SN'(d_{1})\sigma }{2{\sqrt {T-t}}}}-rKe^{-r(T-t)}N(d_{2})\,}{\displaystyle -{\frac {SN'(d_{1})\sigma }{2{\sqrt {T-t}}}}-rKe^{-r(T-t)}N(d_{2})\,}	{\displaystyle -{\frac {SN'(d_{1})\sigma }{2{\sqrt {T-t}}}}+rKe^{-r(T-t)}N(-d_{2})\,}{\displaystyle -{\frac {SN'(d_{1})\sigma }{2{\sqrt {T-t}}}}+rKe^{-r(T-t)}N(-d_{2})\,}
rho	{\displaystyle {\frac {\partial C}{\partial r}}}{\disp
