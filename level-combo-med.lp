% from here until line 12 we do initial board set-up
% setting up level size to be a 15x15 square
#const width=15.
param("width",width).
dim(1..width).
tile((X,Y)) :- dim(X), dim(Y).
% defining relationships between tiles
adj((X1,Y1),(X2,Y2)) :-
tile((X1,Y1)),
tile((X2,Y2)),
#abs(X1-X2)+#abs(Y1-Y2) == 1.
% from here until line 33 we set up some rules and constraints that define our maze
% making the start in the top left and end at bottom right
start((1,1)).
finish((width,width)).
% tiles have at most one named sprite
0 { sprite(T,mountain;message;sandals;sky) } 1 :- tile(T).
% there is exactly one message and one sandals in the whole level and between 50 and 70 sky tiles
:- not 1 { sprite(T,message) } 1.
:- not 1 { sprite(T,sandals) } 1.
:- not 50 { sprite(T,sky) } 70.
% style : at least half of the map has mountain sprites
:- not (width*width)/2 { sprite(T,mountain) }.
% style : messages and sandals have no surrounding mountains for two steps
0 { sprite(T3,mountain):adj(T1,T2):adj(T2,T3) } 0 :- sprite(T1,message).
0 { sprite(T3,mountain):adj(T1,T2):adj(T2,T3) } 0 :- sprite(T1,sandals).
% messages have 4 adjacent sky tiles
4 { sprite(T1,sky):adj(T1,T2) } :- sprite(TI,message).
% style : messages have four adjacent tiles (not up against edge of map)
:- sprite(T1,message), not 4 { adj(T1,T2) }.
% style : every mountain has at least two neighbouring mountains (no isolated rocks and spurs)
2 { sprite(T2,mountain):adj(T1,T2) } :- sprite(T1,mountain).
% from here until line 51 we handle states, which are useful tools to make sure players complete certain tasks before finishing the maze
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
% you can't touch the sky until you leave state 1
:- sprite(T,sky), touch(T,1).
% the finish tile must be touched in state 3
completed :- finish(T), touch(T,3).
:- not completed.
% the following code is to ensure maze complexity, so the mazes aren't all completely easy
% holding sprites constant , ensure every solution touches at least width tiles in each state
__level_design(sprite(T,Name)) :- sprite(T,Name).
__concept :-
width { touch(T,1) },
width { touch(T,2) },
width { touch(T,3) }.
