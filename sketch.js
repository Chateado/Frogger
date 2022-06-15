/* Desenvolvido por Luis Martins */

//(Botões de interação do menu)
var xButton, yButton1, yButton2;

//Verificações do tamanho dos polígonos do menu
var lb, al;

//Sistema de telas
var screen;

//Sistema global do jogo
var pontos, vidas;
var frog, carro_1, carro_2, carro_3, carro_4, carro_5, caveira;
var x_sapo, y_sapo;
var x_carro_1, y_carro_1, x_carro_2, y_carro_2, x_carro_3, y_carro_3, x_carro_4, y_carro_4, x_carro_5, y_carro_5;
var x_caveira, y_caveira;

//Desenhos das linhas do jogo
var linha_start_x, linha_start_y, linha_final_x, linha_final_y;

//Condições e estado do jogo
var hit_car_1, hit_car_2, hit_car_3, kill;

function preload() {
  frog = loadImage('libraries/images/sapo_verde.png');
  carro_1 = loadImage('libraries/images/carro_1.png');
  carro_2 = loadImage('libraries/images/carro_2.png');
  carro_3 = loadImage('libraries/images/carro_3.png');
  carro_4 = loadImage('libraries/images/carro_4.png');
  carro_5 = loadImage('libraries/images/carro_5.png');
  caveira = loadImage('libraries/images/skull.png');
}

function setup() {
  createCanvas(500, 500);
  
  //Tela principal
  
  xButton = 150;
  yButton1 = 250;

  //Definição do tamanho do retângulo
  lb = 200;
  al = 80;

  //Setando tela
  screen = 0;

  //Jogo
  
  hit_car_1 = false;
  hit_car_2 = false;
  hit_car_3 = false;
  kill = false;
  
  pontos = 0;
  vidas = 3;
  
  //Sapo
  
  x_sapo = 235;
  y_sapo = 470;
  
  //Caveira
  x_caveira = 235;
  y_caveira = 470;
  
  //Carros
  
  x_carro_1 = 495;
  y_carro_1 = 75;
  
  x_carro_2 = 395;
  y_carro_2 = 195;
  
  x_carro_3 = 295;
  y_carro_3 = 295;
  
  x_carro_4 = 195;
  y_carro_4 = 155;
  
  x_carro_5 = 15;
  y_carro_5 = 400;
  
  //Desenho das linhas
  
  linha_start_x = 0;
  linha_start_y = 450;
  
  linha_final_x = 0;
  linha_final_y = 50;
  
  faixa_1_x = 30;
  faixa_1_y = 225;
  
  //Botão pra jogar novamente
  
  yButton2 = 250;
}

function draw() {

  frameRate(30);
  
  switch (screen) {
      
    case 0: {
      
      background(220);
      
      textSize(30);
      fill(0, 0 ,0);
      
      text("Frogger", 205, 50);
      
      if (mouseX > xButton && mouseX < xButton + lb && mouseY > yButton1 && mouseY < yButton1 + al) {
        
        fill (124, 252, 0);
        
        if (mouseIsPressed) {
          screen = 1;
        }
        
      } else {
        
        fill(255);
      }
      
      rect(xButton, yButton1, lb, al);
      
      textSize(25);
      fill(0, 0, 0);
      text("Clique para jogar", 190, 300);
  
      circle(mouseX, mouseY, 10);
      break;      
    }
      
    case 1: {
      background(0);
      
      //Renderizando sapo + movimentação
      
      if (kill == false) {
        
         image(frog, x_sapo, y_sapo, 50, 25);
        
        if (keyIsDown(LEFT_ARROW)) {
          x_sapo -= 6;
        } else if (keyIsDown(RIGHT_ARROW)) {
          x_sapo += 6;
        } else if (keyIsDown(UP_ARROW)) {
          y_sapo -= 6;
        } else if (keyIsDown(DOWN_ARROW)) {
          y_sapo += 6;
        }
        
      image(carro_1, x_carro_1, y_carro_1, 50, 25);
      image(carro_2, x_carro_2, y_carro_2, 50, 25);
      image(carro_3, x_carro_3, y_carro_3, 50, 25);
      image(carro_4, x_carro_4, y_carro_4, 50, 25);
      image(carro_5, x_carro_5, y_carro_5, 50, 25);
      
      x_carro_1 = x_carro_1 - (pontos * 2 + 1);
      x_carro_2 = x_carro_2 - (pontos * 2 + 4);
      x_carro_3 = x_carro_3 - (pontos * 2 + 5);
      x_carro_4 = x_carro_4 - (pontos * 4 + 2);
      x_carro_5 = x_carro_5 - (pontos * 2 + 3);
      
      if (x_carro_1 < -50) {
        x_carro_1 = 499;
      } else if (x_carro_2 < -50) {
        x_carro_2 = 499;
      } else if (x_carro_3 < -50) {
        x_carro_3 = 499;
      } else if (x_carro_4 < -50) {
        x_carro_4 = 499;
      } else if (x_carro_5 < -50) {
        x_carro_5 = 499;
      }
    } else {
      
      image(caveira, x_caveira, y_caveira, 25, 25);
      
      textSize(50);
      fill(255, 0, 0);
      text("Você morreu!", 100, 150);
      textSize(25);
    }
      
      
      //Sistema de colisão do sapo com o carro + verificações
      
      /*
      Carro 1
      */
      hit_car_1 = collideRectRect(x_sapo, y_sapo, 50, 25, x_carro_1, y_carro_1, 50, 25);
      
      /*
      Carro 2
      */
      hit_car_2 = collideRectRect(x_sapo, y_sapo, 50, 25, x_carro_2, y_carro_2, 50, 25);
      
      /*
      Carro 3
      */
      hit_car_3 = collideRectRect(x_sapo, y_sapo, 50, 25, x_carro_3, y_carro_3, 50, 25);
      
      /*
      Carro 4
      */
       hit_car_4 = collideRectRect(x_sapo, y_sapo, 50, 25, x_carro_4, y_carro_4, 50, 25);
      
      /*
      Carro 5
      */
       hit_car_5 = collideRectRect(x_sapo, y_sapo, 50, 25, x_carro_5, y_carro_5, 50, 25);
      
    if (hit_car_1 || hit_car_2 || hit_car_3 || hit_car_4 || hit_car_5) {
      if (pontos <= 0) {
        pontos = 0;
      } else {
       pontos = pontos - 1; 
      }
      vidas = vidas - 1;
      resetarSapo();
      
      }
      
      //Definição da linha inicial do sapo
      stroke(255);
      line(linha_start_x, linha_start_y, width, linha_start_y);
      line(linha_final_x, linha_final_y, width, linha_final_y);
      
      //Textos de vida + pontos
      textSize(22);
      fill(124, 252, 0);
      
      text("Vidas: " + vidas, 10, 485);
      text("Pontos: " + pontos, 385, 485);
      
      //Verificação de quando o sapo atravessar a rua
      if (x_sapo && y_sapo < 20 && linha_final_y) {
        
        resetarSapo();
        pontos = pontos + 1;
        
        //A cada dois pontos o jogador ganha uma vida a mais
        if (pontos % 2 == 0) {
          vidas = vidas + 1;
        }
      }
      
      //Verificação de morte após zerar todas as vidas
      if (vidas == 0) {
        kill = true;
      }
      
      //Botão de jogar novamente
      if (kill == true) {
        if (mouseX > xButton && mouseX < xButton + lb && mouseY > yButton2 && mouseY < yButton2 + al) {
        fill (124, 252, 0);
        
        if (mouseIsPressed) {
          reiniciarJogo();
        }
      } else {
        fill(255);
      }
      
      rect(xButton, yButton2, lb, al);
      
      textSize(25);
      fill(0, 0, 0);
      text("Jogar novamente", 135, 295);
      
      circle(mouseX, mouseY, 10);
        
      }
      break;
    }
  }
  
  function resetarSapo() {
    x_sapo = 235;
    y_sapo = 470;
  }
  
  function reiniciarJogo() {
    x_sapo = 235;
    y_sapo = 470;
    vidas = 3;
    pontos = 0;
    kill = false;
  }
}