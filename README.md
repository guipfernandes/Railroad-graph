# Railroad-graph
Railroad Project implementation using graphs in Javascript

## Descrição
Na ilha de Java, há uma ferrovia que interliga um conjunto de províncias. Porém, devido à falta de recursos durante a implantação, todos os trajetos são de via única. Ou seja, a existência de uma rota de Jacarta à Banten não implica na existência de uma rota de Banten à Jacarta. Na verdade, mesmo se essas duas rotas existissem, elas seriam distintas e não teriam necessariamente a mesma distância.

O propósito deste problema é ajudar os usuários da ferrovia com informações a respeito das rotas existentes. Em particular, você calculará a distância de uma certa rota, o número de diferentes rotas entre duas províncias e a menor rota entre duas províncias.

### Entrada do Programa
Um grafo direcionado onde um vértice representa uma província e uma aresta representa uma rota entre duas províncias. O peso da aresta representa a distância entre as duas províncias. Uma determinada rota nunca aparecerá mais de uma vez no grafo (exemplo: "AC5, DB3, AC5") e a província de partida nunca será a província de chegada (exemplo: "AA2").

### Saída do Programa
Considerando o cenário de exemplo, mostrado abaixo, o programa calculará o seguinte:

- #1: A distância da rota A-B-C.
- #2: A distância da rota A-D.
- #3: A distância da rota A-D-C.
- #4: A distância da rota A-E-B-C-D.
- #5: A distância da rota A-E-D.
- #6: O número de rotas que começam em C e terminam em C com o máximo de 3 paradas. No cenário de exemplo, há duas possíveis rotas: C-D-C (com duas paradas) e C-E-B-C (com três paradas).
- #7: O número de rotas que começam em A e terminam em C com exatamente 4 paradas. No cenário de exemplo, há três possíveis rotas: A-B-C-D-C, A-D-C-D-C e A-D-E-B-C.
- #8: A distância da rota mais curta de A à C.
- #9: A distância da roda mais curta de B à B.
- #10: O número de diferentes rotas de C à C com uma distância menor que 30. No cenário de exemplo, há 7 rotas: C-D-C, C-E-B-C, C-E-B-C-D-C, C-D-C-E-B-C, C-D-E-B-C, C-E-B-C-E-B-C e C-E-B-C-E-B-C-E-B-C.

*Observação: Do item 1 ao 5, caso não haja nenhuma rota, imprima "ROTA NAO EXISTE". Caso contrário, siga a rota como foi passada e não faça paradas extras. Por exemplo: o primeiro item diz para ir de A diretamente para B (com distância 5) e depois de B diretamente para C (com distância 4).


### Cenário de exemplo

Para a entrada do teste, as províncias são nomeadas utilizando apenas uma letra do alfabeto de A a E. Uma rota entre duas províncias A e B com distância 5 é representada como "AB5".

GRAFO DE ENTRADA: BC4, AD5, DC8, CD8, DE6, CE2, AE7, EB3, AB5

SAÍDA ESPERADA:
- #1: 9
- #2: 5
- #3: 13
- #4: 22
- #5: ROTA NAO EXISTE
- #6: 2
- #7: 3
- #8: 9
- #9: 9
- #10: 7

## Test

```
git clone https://github.com/guipfernandes/Railroad-graph.git
cd Railroad-graph
npm install 
npm run test
```
