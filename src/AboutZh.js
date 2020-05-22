import React from 'react';
import PressableLink from './PressableLink';
import DownloadLinks from './DownloadLinks';

export default function About(props){
    return (
        <>
            {props.inApp && <br/>}
            <PressableLink className={props.linkClass} onClick={props.toggleAbout}>[B]ack to Chart</PressableLink>
            <br/>
            {!props.inApp &&
            <div class="downloadBox">
                <h1>下载xOPS CPU基准测试</h1>
                <br/>
                <DownloadLinks />    
            </div>}

            {!props.download &&
            <> 
            <h1>图表结果如何获得</h1>
            <br/>
            <div className="text">
                <p>
                <em>xOPS</em> 应用程序用于衡量存储性能。 
                {!props.inApp && <> 请参阅上方的下载链接。</>}
                </p>
                <p>
                至少进行了3次测试，并给出了平均值。 使用默认选项（整数和浮点测试相同）-32位精度，线程数确定为CPU内核数的两倍（例如8个线程和4个内核）。为避免Intereferences和副作用关闭前景/正在运行的应用程序，请检查网络活动是否处于非活动状态（例如，不进行更新，下载）。
                </p>
            </div>
            <br/>
            </>}

            <h1>应用程序的工作方式</h1>
            <br/>
            <div className="text">
                <p>
                该应用程序测量中央处理器对整数(integer)与分数(floating-point) 执行的运算（加法、减法、乘法、除法、比较等）的数量：
                </p>    
                <p>
                    <ol>
                        <li>FLOPS (Floating-point Operations Per Second)是指每秒分数运算数量，数学协处理器的运算速度 （Floating Point Unit, FPU）；</li>
                        <li>INOPS (Integer Operations Per Second) 是指每秒整数运算数量，算术逻辑单元的运算速度(Arithmetic logic unit, ALU)</li>
                    </ol>
                </p>
                <p>
                例如，1 G(iga) FLOPS的意思是，该处理器能够使用分数执行十亿次运算 （即1.1+2.2=3.3）。
                </p>
                <p>
                应用程序的基本逻辑系统通常基于整数计算，而图像处理与游戏基于分数计算。
                </p>
                <p>
                既算术逻辑单元，又数学协处理器在单线程和多线程模式下经过测试，这都反映单核和多核处理器的运算速度。
                </p>
                <p>
                上述的测试都是隔离测试，意思是，仅用于中央处理器，不包括计算机系统的其他组件（内存，高速缓存，存储，网络，软件优化）。
                </p>
                <p>
                运算速度取决于很多因素，虽然处理器是最重要的部分之一，但它不是唯一的部分。该应用程序不试图简单地回答一个复杂的问题：我的手机/笔记本电脑/电脑的运行速度多大？但是，它评估设备的一个重要组成部分的，即处理器，的运行速度。xOPS不使用LINPACK基准（其与FLOPS通常使用）。然而，一级近似计算的结果是与 LINPACK可比较的（特别是与超级计算机相比）。比如，对于Intel Core i7第8代笔记本电脑使用的LINPACK程序原本（在GCC中被编译）的运算结果是5.8GFLOPS（在单线程模式下），xOPS - 4,5 GFLOPS。
                </p>
                <p>
                同时，LINPACK实现复杂的算法并具有广泛的优化领域。例如， 在使用同样的硬件的情况下，Intel LINPACK程序包结果是~ 30 GFLOPS。因此，对 LINPACK 来说，最复杂的是使编译器优化、运行环境等因素最小化。
                </p>
                <p>
                xOPS是一个跨平台的程序，旨在确保跨多个设备和操作系统的一致结果。这是通过以下方式实现的:
                <ol>
                    <li>
                    操作都是平凡的。该应用程序使用一种简单的循环，不使用任何的分支、外部调用或复杂的数据结构等。有几个连续的标量运算（即加法和乘法），它们重复执行数百万次。
                </li>
                <li>
                CIL指令计算。Arm和x86体系结构非常不同，对于相同的操作可以采用不同数量的指令。 不同的编译器也可以为相同的源代码（即使对于相同的体系结构）生成不同的机器代码。 xOPS是基于.NET并编译成CIL中间字节码（Common Intermediate Language）。 该字节码又被转换为机器代码。 xOPS中使用的每个操作测量单位是一个CIL指令。 因此，该应用程序测量处理器每单位时间能够执行的CIL指令数量，并不考虑到特定的机器指令。
                </li>
                <li>
                禁用优化。对编译器配置形式排除主循环优化的可能性。 此外，循环中的代码以最明显的方式被编写：一行是对一个运算对象执行的一次运算。 这使系统能够用最明显的方式将字节码转换为机器代码。
                </li>
                <li>
                试制、寻找运算的最佳组合、对其他基准结果进行比较。m.NET平台应有JIT（Just-in-Time）或AOT (Ahead-of-Time)编译器，以及一个中间运行环境。 具有不同版本的.NET（适用于Mac和Android的Mono，适用于Windows的.NET Framework）以及不同版本的JIT。 这些因素对结果差别的影响很大（不同的机器代码、指令级并行性、分支预测等）。为了确保结果具有显著性而可比较，寻找最佳组合和代码设置时，对在不同的设备和操作系统上的结果不断地进行了比较。
                </li>
                <li>
                迅速。测试需要5到20秒（取决于设备性能），而其他测试套件则需要数分钟。
                </li>
                </ol>
                </p>
                <p>
                考虑到上述措施，在同一台MacBook上运行的应用程序（在Windows Bootcamp，macOS和Android Emulator中）有5％的结果差别。 此外，xOPS的结果比另一个流行的跨平台基准的结果（基于15个设备的测量结果）具有95％相关。
                </p>
                <p>
                该项目采用开源软件，以获得开放源代码，请访问：<a href="https://github.com/maxim-saplin/xOPS-App">https://github.com/maxim-saplin/xOPS-App</a>
                </p>
            </div>
        </>
    )
}