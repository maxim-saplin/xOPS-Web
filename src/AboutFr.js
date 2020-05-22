import React from 'react';
import PressableLink from './PressableLink';
import DownloadLinks from './DownloadLinks';

export default function About(props) {
    return (
        <>
            {props.inApp && <br />}
            <PressableLink className={props.linkClass} onClick={props.toggleAbout}>[R]etour aux résultats</PressableLink>
            <br />
            {!props.inApp &&
                <div class="downloadBox">
                    <h1>Télécharger xOPS CPU Benchmark</h1>
                    <br />
                    <DownloadLinks />
                </div>}

            {!props.download &&
                <>
                    <h1>Comment les résultats sont obtenus</h1>
                    <br />
                    <div className="text">
                        <p>
                            L'application <em> xOPS </em> est utilisée pour mesurer les performances de stockage.
                {!props.inApp && <>Voir les liens de téléchargement ci-dessus.</>}
                        </p>
                        <p>
                            Au moins 3 essais sont effectués et des valeurs moyennes sont présentées. Les options par défaut sont utilisées (idem pour les tests de nombres entiers et flottants) - précision 32 bits, nombre de threads
                            est déterminé comme le double du nombre de cœurs de processeur (par exemple, 8 threads avec 4 cœurs).
                            Pour éviter les interférences et les effets secondaires, les applications de premier plan / en cours d'exécution sont fermées, l'activité du réseau est vérifiée pour être inactive (par exemple, aucune mise à jour, téléchargement)
                </p>
                    </div>
                    <br />
                </>}

            <h1>Comment fonctionne l'application</h1>
            <br />
            <div className="text">
                <p>
                L'application calcule le nombre d'opérations (addition, soustraction, multiplication, division, etc.) qu'un processeur central peut effectuer en une seconde donnée avec des nombres fractionnaires (virgule flottante) ou entiers:
                </p>
                <p>
                    <ol>
                        <li> FLOPS (Floating-point Operations Per Second) - quantité d’opérations à virgule flottante, mesure de la performance du coprocesseur mathématique (Floating Point Unit, FPU).</li>
                        <li> INOPS (Integer Operations Per Second) - quantité d’opérations à nombres entiers par seconde, mesure de la performance de l'unité logique arithmétique (Arithmetic logic unit, ALU).</li>
                    </ol>
                </p>
                <p>
                    Par exemple, 1 G(iga)FLOPS signifie que le processeur peut effectuer 1 milliard d'opérations à virgule flottante (telles que 1,1 + 2,2 = 3,3).
                </p>
                <p>
                    La logique générale de l’application repose généralement sur des opérations à nombres entiers, tandis que les problèmes graphiques et les jeux reposent sur des opérations à virgule flottante.
                </p>
                <p>
                    Les tests sont exécutés en modes single-thread et multithread et reflètent les performances multicœur et monocœur.
                </p>
                <p>
                    Les tests sont "isolés", ce qui signifie qu'ils se concentrent uniquement sur la charge du processeur central en ignorant les autres parties du système (telles que la mémoire, le cache, le stockage, le réseau, etc.). Bien que l'application ne donne pas une réponse simple à une des questions compliquées "Quelle est la performance du téléphone/de l’ordinateur portable/du PC?", elle évolue un des composants les plus importants de votre appareil - le processeur.
                </p>
                <p>
                    xOPS n'implémente pas le benchmark LINPACK (qui est généralement associé à la majorité des mentions FLOPS), les résultats peuvent être comparées en première approximation à LINPACK (en particulier lors de la comparaison avec des supercalculateurs). Par exemple, sur un ordinateur portable avec Intel Core i7 8e génération, le programme LINPACK (compilé avec le GCC) donne 5,8 GFLOPS (single-thread), xOPS - 4,5 GFLOPS.  
                </p>
                <p>
                    En même temps, LINPACK implémentant un algorithme complexe, a beaucoup de possibilités pour les optimisations. Par exemple, le package Intel LINPACK donne ~ 30 GFLOPS sur le même matériel. Cela rend les résultats du test très dépendants de plusieurs facteurs (optimisations du compilateur, environnement d'exécution, etc.).
                </p>
                <p>
                    xOPS est un programme multiplateforme qui a pour objectif la cohérence des résultats lors de l'exécution sur de nombreux appareils / systèmes d'exploitation. Ceci est accompli grâce à ce qui suit:
                <ol>
                    <li>
                        Trivialité des opérations <br />
                        L'application implémente un cycle simple, sans branches, appels externes, structures de données complexes, etc. Il y a peu d'opérations scalaires (telles que l’addition, la multiplication) qui sont répétées des millions de fois.
                    </li>
                    <li>
                        Comptage des instructions CIL.<br />
                        Les architectures Arm et Intel sont très différentes, la même opération peut être représentée par un nombre d'instructions différent. Des compilateurs différents peuvent également produire un code machine différent (même pour la même architecture). L'application xOPS est basée sur .NET et compilée en bytecode-CIL (Common Intermediate Language). Ce bytecode est ensuite transformé en code machine. xOPS prend pour unité de mesure d’opération une instruction CIL. Ainsi l’application mesure le nombre d'instructions CIL que le processeur est capable d’exécuter par unité de temps.
                    </li>
                    <li>
                        Désactivation des optimisations <br />
                        Les compilateurs sont configurés à ne pas appliquer les optimisations à la boucle principale. Le corps de la boucle est écrit de la manière la plus évidente. Tout cela vise à produire le code machine le plus simplement possible.
                    </li>
                    <li>
                        Expérimentations, recherche de combinaison optimale d’opérations, comparaison des résultats avec celles d’autres benchmarks.<br />
                        La plate-forme .NET suppose l’occurrence du compilateur JIT (Just-in-Time) ou AOT (Ahead-of-Time) et de l’environnement d'exécution (Runtime). Il existe des versions différentes de .NET (Mono pour Mac et Android, .NET Framework pour Windows) et des versions différentes de JIT. Les combinaisons de ces facteurs présentent une source significative de variation (code machine différent, parallélisme au niveau de l'instruction, prédictions de branchement, etc.). Pour s'assurer que les résultats sont significatifs et cohérents, un effort considérable a été entrepris à ajuster le code et l'essayer sur plusieurs appareils / systèmes d'exploitation.
                    </li>
                    <li>
                        Promptitude<br />
                        Les tests prennent 5 à 20 secondes (selon les performances de l'appareil) par rapport aux minutes avec d'autres suites de tests.
                    </li>
                </ol>
                </p>
                <p>
                    Compte tenu de ce qui précède, l'application exécutée sur un MacBook (dans Windows Bootcamp, macOS et Android Emulator) affiche la variabilité des résultats de 5%. Les résultats de xOPS montrent une corrélation de 95% avec celles d’un autre benchmark multiplateforme populaire (conformément aux résultats de mesure de 15 appareils).
                </p>
                <p>
                    L'application est open source:  <a href="https://github.com/maxim-saplin/xOPS-App"> https://github.com/maxim-saplin/xOPS-App </a>
                </p>
            </div>
        </>
    )
}