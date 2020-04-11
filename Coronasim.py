import random
import Vetores

scrw, scrh = 800, 600


def int_erpolate(start, end, steps):
    """Interpolação linear inteira entre dois pontos.

    start, end: vetores 2-D que representam os pontos de início e fim da interpolação.
    Não precisam ser vetores inteiros.
    Apenas end é incluído no retorno.

    Retorna: um vetor de vetores 2-D contendo todos os pontos da interpolação, em ordem."""

    delta_y = end[1] - start[1]
    delta_x = end[0] - start[0]
    d_y = delta_y/steps
    d_x = delta_x/steps
    r = []
    for k in range(1, steps+1):
        r.append([int(start[0] + k*d_x), int(start[1] + k*d_y)])
    return r


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
        steps = random.randint(10, 50)
        self.path = int_erpolate(start_pos, end_pos, steps)
        # parâmetros de infecção
        self.infect_radius = 5
        self.p = 0.5
        self.infect_count = 0

    def move(self):
        if self.pos == self.path[-1]:
            # resseta o caminho
            start_pos = self.pos
            end_pos = [random.randint(0, scrw), random.randint(0, scrh)]
            steps = random.randint(10, 50)
            self.path = int_erpolate(start_pos, end_pos, steps)
        else:
            # avança a pessoa
            self.k += 1
            self.pos = self.path[self.k]


class Population:
    def __init__(self, n):
        self.people = [Person() for _ in range(n)]
        self.census()
        self.infect_duration = 10000

    def infect(self):
        # outros métodos da população: calcular R
        for inf in self.infected:
            for hel in self.healthy:
                if Vetores.dist(hel.pos, inf.pos) < hel.infect_radius + inf.infect_radius:
                    hel.state = 1

    def infection_evolve(self):
        for inf in self.infected:
            if inf.infect_count >= self.infect_duration:
                # retira os mortos/recuperados
                inf.state += 1

    def census(self):
        self.healthy = [person for person in self.people if person.state == 0]
        self.infected = [person for person in self.people if person.state == 1]
        self.removed = [person for person in self.people if person.state == 2]

    def pop_update(self):
        self.infect()
        self.infection_evolve()
        self.census()
