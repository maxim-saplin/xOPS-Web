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
                    <h1>Comment les résultats du graphique sont-ils obtenus?</h1>
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
                    L'application calcule le nombre d'opérations (addition, soustraction, multiplication, division, etc.) qu'un processeur peut effectuer en une seconde donnée avec des nombres fractionnaires (virgule flottante) ou entiers:
                </p>
                <p>
                    <ol>
                        <li> FLOPS - Opérations à virgule flottante par seconde, mesure des performances de l'unité à virgule flottante (FPU). </li>
                        <li> INOPS - Opérations entières par seconde, mesure de l'unité logique arithmétique (ALU) </li>
                    </ol>
                </p>
                <p>
                    Par exemple. 1 G (iga) FLOPS signifie que le processeur peut effectuer 1 milliard d'opérations en virgule flottante par seconde (comme 1,1 + 2,2 = 3,3).
                </p>
                <p>
                    La logique générale des applications dépend généralement des opérations entières, tandis que les graphiques et les jeux reposent sur des opérations à virgule flottante. Plus votre processeur peut calculer des chiffres rapidement, plus vos applications peuvent s'exécuter rapidement.
                </p>
                <p>
                    Les tests sont exécutés en modes simple et multithread et reflètent les performances multicœur et monocœur.
                </p>
                <p>
                    Les tests sont "isolés", ce qui signifie qu'ils se concentrent sur la création de charge CPU uniquement lors de l'intégration d'autres parties du système (telles que la mémoire, le cache, le stockage, le réseau, etc.). De nombreux facteurs déterminent les performances des systèmes et le processeur, bien que le principal ne soit pas le seul. Bien que l'application ne donne pas une seule réponse / note simple aux questions "Quelle est la vitesse du téléphone / ordinateur portable / PC?", Elle donne une mesure de performance comparable d'une pièce importante de votre appareil - le CPU.
                </p>
                <p>
                    xOPS n'implémente pas le benchmark LINPACK (qui est généralement associé à la majorité des mentions FLOPS), les résultats peuvent être une comparaison approximative à LINPACK (en particulier lors de la comparaison avec des superordinateurs). Par exemple. sur un ordinateur portable avec Intel Core i7 8e génération, le programme LINPACK original (compilé avec GCC) donne 5,8 GFLOPS à filetage unique, xOPS - 4,5 GFLOPS.
                </p>
                <p>
                    Dans le même temps, LINPACK implémentant un algorithme sophistiqué a beaucoup de place pour les optimisations. LINPACK optimisé par Intel donne ~ 30 GFLOPS. Cela rend les résultats du test très dépendants de plusieurs facteurs (optimisations du compilateur, environnement d'exécution, etc.).
                </p>
                <p>
                    xOPS étant des cibles multiplateformes pour assurer la cohérence des résultats lors de l'exécution sur de nombreux appareils / systèmes d'exploitation. Pour ce faire, il existe quelques fonctionnalités:
                <ol>
                        <li>
                Trivialité des opérations <br />
                L'application implémente une boucle simple, sans branches, appels externes, structures de données complexes, etc. Il y a peu d'opérations scalaires conséquentes (telles que add et multiple) qui sont répétées des millions de fois.
                </li>
                        <li>
                Compter les instructions CIL <br />
                Les architectures Arm et x86 sont très différentes, une même opération peut être représentée par un nombre d'instructions différent. Différents compilateurs peuvent également produire différents codes machine (même pour la même architecture). L'application est basée sur .NET qui est compilé en bytecode - CIL (Common Intermediate Language). Ce bytecode est ensuite traduit en code natif. Comme point de référence, le nombre d'opérations dans une seule boucle est compté comme un certain nombre d'instructions CIL. Ceci résume la question du traitement de diverses architectures et codes machine.
                </li>
                        <li>
                Désactivation des optimisations <br />
                Le compilateur est invité à désactiver les optimisations pour la boucle de mesure. Le corps de la boucle est écrit de la manière la plus explicite. Tout cela vise à produire le code machine le plus simple.
                </li>
                        <li>
                        Expérimenter, trouver le bon mélange d'opérations, établir les résultats de base <br />
                        La plate-forme .NET suppose qu'il existe un compilateur JIT (Just-in-Time) ou AOT (avance) pour le code. Il existe différentes versions de .NET (Mono pour Mac et Android, .NET Framework pour Windows) et différents mélanges de JIT et d'exécution peuvent introduire une source de variation importante (code machone produit, parallélisme au niveau de l'instruction, prédictions de branche, etc.). Pour s'assurer que les résultats sont significatifs et cohérents, un effort solide a été mis à bricoler le code et à l'essayer sur plusieurs appareils / environnements.
                </li>
                <li>
                Promptitude<br />
                Les tests prennent 5 à 20 secondes (selon les performances de l'appareil) par rapport aux minutes avec d'autres suites de tests.
                </li>
                </ol>
                </p>
                <p>
                    Avec les mesures ci-dessus prises, l'application lorsqu'elle est exécutée sur le même MacBook (dans Windows Bootcamp, macOS et Android Emulator) affiche la répartition des résultats à 5%. Les résultats xOPS comparés à un autre benchmark multiplateforme populaire (à la version 5 maintenant) montrent une corrélation de 95% des scores.
                </p>
                <p>
                    L'application est open source: <a href="https://github.com/maxim-saplin/xOPS-App"> https://github.com/maxim-saplin/xOPS-App </a>
                </p>
            </div>
        </>
    )
}