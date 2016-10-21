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
0 { sprite(T,wall;key;hades) } 1 :- tile(T).
% there is exactly one hades and one key in the whole level
:- not 1 { sprite(T,hades) } 1.
:- not 1 { sprite(T,key) } 1.
:- not 1 { sprite(T,hades) } 1.
% style : at least half of the map has wall sprites
:- not (width*width)/2 { sprite(T,wall) }.
% style : hadess have no surrounding walls for two steps
0 { sprite(T3,wall):adj(T1,T2):adj(T2,T3) } 0 :- sprite(T1,hades).
% style : hadess have four adjacent tiles (not up against edge of map)
:- sprite(T1,hades), not 4 { adj(T1,T2) }.
% style : every wall has at least two neighbouring walls (no isolated rocks and spurs)
2 { sprite(T2,wall):adj(T1,T2) } :- sprite(T1,wall).
% style : keys have at least three surrounding walls (they are stuck in a larger wall)
3 { sprite(T2,wall):adj(T1,T2) } :- sprite(T1,key).
% states :
% 1 −−> initial
% 2 −−> after picking up key
% 3 −−> after touching hades
% you start in state 1
touch(T,1) :- start(T).
% possible navigation paths
{ touch(T2,2):adj(T1,T2) } :- touch(T1,1), sprite(T1,key).
{ touch(T2,3):adj(T1,T2) } :- touch(T1,2), sprite(T1,hades).
{ touch(T2,S):adj(T1,T2) } :- touch(T1,S).
% you can’t touch a wall in any state
:- sprite(T,wall), touch(T,S).
:- sprite(T,hades), touch(T,S).
% the finish tile must be touched in state 2
completed :- finish(T), touch(T,2).
:- not completed.
% holding sprites constant , ensure every solution touches at least width tiles in each state
__level_design(sprite(T,Name)) :- sprite(T,Name).
__concept :-
width { touch(T,1) },
width { touch(T,2) },
width { touch(T,3) }.