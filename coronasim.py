import random
# valores de exemplo, devem ser passados da parte gráfica
scrw, scrh = 800, 600


def int_erpolate(start, end, steps):
    """Interpolação linear inteira entre dois pontos.
    start, end: vetores 2-D que representam os pontos de início e fim da interpolação.
    Não precisam ser vetores inteiros.
    Apenas end é incluído no retorno (start não).
    Retorna: um vetor de vetores 2-D contendo todos os pontos da interpolação, em ordem."""

    delta_y = end[1] - start[1]
    delta_x = end[0] - start[0]
    d_y = delta_y/steps
    d_x = delta_x/steps
    r = []
    for k in range(1, steps+1):
        r.append([int(start[0] + k*d_x), int(start[1] + k*d_y)])
    return r


def int_vec(vec):
    """Retorna um vetor com coordenadas inteiras.
    Útil para a parte gráfica, onde posições na tela são vetores de coordenadas inteiras."""
    return [int(vec[0]), int(vec[1])]


def dist(v1, v2):
    """Retorna a distância entre 2 pontos."""
    return ((v1[0] - v2[0])**2 + (v1[1] - v2[1])**2) ** 0.5


class Person:
    def __init__(self):
        # 0 é não infectado
        # 1 é infectado
        # 2 é finalizado
        self.state = 0
        # o movimento é feito por interpolação linear entre sua posição atual
        # e um ponto final aleátorio com um número aleatório de passos
        # (grande o suficiente p o movimento parecer smooth)
        self.pos = [random.randint(0, scrw), random.randint(0, scrh)]
        start_pos = self.pos
        self.k = 0  # indice do path
        end_pos = [random.randint(0, scrw), random.randint(0, scrh)]
        steps = random.randint(100, 500)
        self.path = int_erpolate(start_pos, end_pos, steps)
        # parâmetros de infecção
        # distância de contato, somada com a distância de contato de outra
        # pessoa p checar se há infecção
        self.infect_radius = 5
        # probabilidade de infecção, dada a proximidade adequada
        self.p = 0.5
        # counter de infecção, sempre 0 quando não infectado
        self.infect_count = 0

    def move(self):
        if self.pos == self.path[-1]:
            # resseta o caminho
            self.k = 0
            start_pos = self.pos
            end_pos = [random.randint(0, scrw), random.randint(0, scrh)]
            steps = random.randint(100, 500)
            self.path = int_erpolate(start_pos, end_pos, steps)
        else:
            # avança a pessoa
            self.k += 1
            self.pos = self.path[self.k]


class Population:
    def __init__(self, n):
        self.people = [Person() for _ in range(n)]
        # cria subgrupos de pessoas (infectados, saudáveis e removidos)
        self.census()
        self.infect_duration = 1000
        patient_0 = random.choice(self.people)
        patient_0.state += 1

    def infect(self):
        """Checa novas infecções e altera o estado dos novos infectados."""
        for inf in self.infected:
            for hel in self.healthy:
                if dist(hel.pos, inf.pos) < hel.infect_radius + inf.infect_radius:
                    if random.random() > hel.p:
                        hel.state = 1

    def infection_evolve(self):
        """Evolui a infecção de antigos infectados.
        Isto é, checa se infected.count já ultrapassou self.infect_duration."""
        for inf in self.infected:
            inf.infect_count += 1
            if inf.infect_count >= self.infect_duration:
                # retira os mortos/recuperados
                inf.state += 1

    def census(self):
        """Separa subgrupos de pessoas saudáveis, infectadas e removidas."""
        self.healthy = [person for person in self.people if person.state == 0]
        self.infected = [person for person in self.people if person.state == 1]
        self.removed = [person for person in self.people if person.state == 2]

    def pop_update(self):
        """Reúne os outros métodos."""
        self.infect()
        self.infection_evolve()
        self.census()
        for person in self.people:
            person.move()
