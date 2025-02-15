# Minutes Template

## Meeting Minutes for 29/11/2024 18:00, Duration: 1h

### Attendees:
- João Viegas
- João Monteiro
- Jorge Domingues
- Guilherme Santos


### Objective:
O objectivo desta reunião foi planear as tarefas em falta nesta iteração e discutir problemas relacionados com os endpoints e as user stories já desenvolvidas, identificando possíveis alterações necessárias.


### Meeting Agenda:
1. **Reformular User Stories**
2. **Avaliar a necessidade de novos endpoints e descartar os desnecessários**
3. **Definir as páginas a implementar até ao final da iteração**
4. **Analisar estratégias para gerar dados para a base de dados e os possíveis problemas associados**


### Meeting Notes:
- **Discussão sobre erros nas user stories inicialmente definidas para o projecto.**
- **Definição das páginas ainda por implementar, com prioridade para as páginas relacionadas com o administrador do website. João Viegas, Jorge Domingues e João Monteiro ficam responsáveis por implementar estas páginas.**
- **Responsabilização de Guilherme Santos pela implementação do Kafka e pelo deployment do sistema.**
- **Identificação de problemas nos endpoints relacionados com os formulários dos managers e as mensagens enviadas para a base de dados.**
- **Planeamento para lidar com a eliminação de managers e restaurantes associados para a próxima iteração.**


### Discussion items:
- **Reformular User Stories** - As user stories iniciais não acompanhavam a evolução natural do projecto, especialmente no que diz respeito aos managers, ao processo de criação de restaurantes e à necessidade de aprovação pelo administrador.

- **Avaliar a necessidade de endpoints** - Foi identificada a necessidade de ajustes nos endpoints. Alguns, actualmente definidos, revelaram-se desnecessários, enquanto outros, especialmente para as tabelas de managers no painel do administrador, deverão ser criados.
Discutiu-se também a necessidade de incluir a role do utilizador na mensagem de resposta do endpoint de login.

- **Definir as páginas a implementar até ao final da iteração** - Foi estabelecido que as páginas relativas ao administrador deverão ser prioritárias nesta iteração.
Além disso, foi debatida a implementação de páginas relacionadas com formulários.

- **Gerar dados para a base de dadoss** - Discutiu-se a geração de dados, com atenção especial aos estados das orders, à inclusão de imagens e à coerência dos dados gerados.

- **Kafka e Deployment** - Será necessário integrar o Kafka com o Docker Compose e preparar o sistema para deployment. 
