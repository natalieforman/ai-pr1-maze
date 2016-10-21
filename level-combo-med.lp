#const width=15.
param("width",width).
dim(1..width).
tile((X,Y)) :- dim(X), dim(Y).
adj((X1,Y1),(X2,Y2)) :-
tile((X1,Y1)),
tile((X2,Y2)),
#abs(X1-X2)+#abs(Y1-Y2) == 1.
start((1,1)).
finish((width,width)).
% tiles have at most one named sprite
0 { sprite(T,mountain;message;sandals;sky) } 1 :- tile(T).
% there is exactly one message and one sandals in the whole level
:- not 1 { sprite(T,message) } 1.
:- not 1 { sprite(T,sandals) } 1.
:- not 50 { sprite(T,sky) } 70.
% style : at least half of the map has mountain sprites
:- not (width*width)/2 { sprite(T,mountain) }.
% style : messages have no surrounding mountains for two steps
0 { sprite(T3,mountain):adj(T1,T2):adj(T2,T3) } 0 :- sprite(T1,message).
0 { sprite(T3,mountain):adj(T1,T2):adj(T2,T3) } 0 :- sprite(T1,sandals).
4 { sprite(T1,sky):adj(T1,T2) } :- sprite(TI,message).
% style : messages have four adjacent tiles (not up against edge of map)
:- sprite(T1,message), not 4 { adj(T1,T2) }.
% style : every mountain has at least two neighbouring mountains (no isolated rocks and spurs)
2 { sprite(T2,mountain):adj(T1,T2) } :- sprite(T1,mountain).
% states :
% 1 −−> initial
% 2 −−> after picking up sandals
% 3 −−> after getting message message
% you start in state 1
touch(T,1) :- start(T).
% possible navigation paths
{ touch(T2,2):adj(T1,T2) } :- touch(T1,1), sprite(T1,sandals).
{ touch(T2,3):adj(T1,T2) } :- touch(T1,2), sprite(T1,message).
{ touch(T2,S):adj(T1,T2) } :- touch(T1,S).
% you can’t touch a mountain in any state
:- sprite(T,mountain), touch(T,S).
:- sprite(T,sky), touch(T,1).
% the finish tile must be touched in state 3
completed :- finish(T), touch(T,3).
:- not completed.
% holding sprites constant , ensure every solution touches at least width tiles in each state
__level_design(sprite(T,Name)) :- sprite(T,Name).
__concept :-
width { touch(T,1) },
width { touch(T,2) },
width { touch(T,3) }.