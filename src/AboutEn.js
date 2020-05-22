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
                <h1>Download xOPS CPU Benchmark</h1>
                <br/>
                <DownloadLinks />    
            </div>}

            {!props.download &&
            <> 
            <h1>How the Chart Results are Obtained</h1>
            <br/>
            <div className="text">
                <p>
                <em>xOPS</em> application is used to measure storage performance. 
                {!props.inApp && <> See download links above.</>}
                </p>
                <p>
                At least 3 test runs are done and average values are presented. Default options are used (same for integer and float tests ) - 32 bit precision, number of threads
                is determined as a double of the number of CPU cores (e.g. 8 threads with 4 cores) .
                To avoid intereferences and side effects foreground/running apps are closed, network activity is checked to be inactive (e.g. no updates, downloads).
                </p>
            </div>
            <br/>
            </>}

            <h1>How the App Works</h1>
            <br/>
            <div className="text">
                <p>
                The app calculates how many operations (add, subtract, multiply, divide, etc.) a CPU can perform in a given second with either fractional (floating-point) or integer numbers:
                </p>    
                <p>
                    <ol>
                        <li>FLOPS - Floating-point Operations Per Second, performance measurement of Floating Point Unit (FPU). </li>
                        <li>INOPS - Integer Operations Per Second, measurement of Arithmetic Logic Unit (ALU)</li>
                    </ol>
                </p>
                <p>
                E.g. 1 G(iga)FLOPS means that CPU can do 1 billion floating-point operations per second (such as 1.1+2.2=3.3).
                </p>
                <p>
                General app logic is typically reliant on integer operations, while graphics and games rely on floating-point ones. The faster your CPU can crunch numbers, the faster your apps can run.
                </p>
                <p>
                Tests are executed in single and multithreaded modes and reflect multi-core and single-core performance. 
                </p>
                <p>
                The tests are "isolated", meaning that they focus on creating CPU load only while ingoring other parts of the system (such as memory, cache, storage, network etc.). There're many factors determining systems' performance and CPU although the major one  is not the only. While the app doesn’t give a single simple answer/score to the questions "How fast is the phone/laptop/PC?", it gives a comparable performance metric of one important piece of your device - the CPU.
                </p>
                <p>
                xOPS doesn't implement LINPACK benchmark (which is typically associated with majority of FLOPS mentions), the results can be a fair ballpark comparison to LINPACK (especially when comparing to supercomputers). E.g. on a laptop with Intel Core i7 8th Gen the original LINPACK program (compiled with GCC) gives 5.8 GFLOPS single threaded, xOPS - 4.5 GFLOPS. 
                </p>
                <p>
                At the same time, LINPACK implementing a sophisticated algorithm has much room for optimizations. Intel optimized LINPACK gives ~30 GFLOPS. This makes the results of the test very dependent on multiple factors (compiler optimizations, runtime environment etc.). 
                </p>
                <p>
                xOPS being cross-platform targets at ensuring consistency in results while running on many devices/OS's. To do so there're few features:
                <ol>
                    <li>
                Triviality of the operations<br/>
                The app implements plain loop, with no branches, externals calls, complex data structures etc. There're few consequent scalar operations (such as add and multiple) which are repeated millions of times.
                </li>
                <li>
                Counting CIL instructions<br/>
                Arm and x86 architectures are very different, same operation can be represented by different number of instructions. Different compilers can also produce different machine code (even for the same architecture). The app is based on .NET which is compiled to bytecode - CIL (Common Intermediate Language). This bytecode is latter translated to native code. As a reference point the number of operations in a single loop is counted as a number of CIL instructions. This abstracts away the question of dealing with various architectures and machine codes.
                </li>
                <li>
                Disabling optimizations<br/> 
                Compiler is instructed to disable optimizations for the measurement loop. The body of the loop is written in the most explicit way. All of that is aimed at producing the most straightforward machine code.
                </li>
                <li>
                Experimenting, finding the right mixture of operations, baselining the results<br/>
                .NET platform assumes there's JIT (Just-in-Time) or AOT (ahead-of-time) compiler and runtime for the code. There're different versions of .NET (Mono for Mac and Android, .NET Framework for Windows) and different mixtures of JITs and runtimes can introduce a significant source of variation (machone code produced, instruction level parallelism, branch predictions etc.). To make sure the results are meaningful and consistent a solid effort has been put into tinkering with the code and trying it on multiple devices/environments.
                </li>
                <li>
                Promptness<br/>
                Tests take 5-20 seconds (depending on device performance) compared to minutes with other test suites.
                </li>
                </ol>
                </p>
                <p>
                With the above measures taken the app when run on the same MacBook (in Windows Bootcamp, macOS and Android Emulator) shows the spread of results at 5%. xOPS results when compared against another popular cross-platform benchmark (at version 5 now) shows 95% correlation of scores.
                </p>
                <p>
                The app is open source: <a href="https://github.com/maxim-saplin/xOPS-App">https://github.com/maxim-saplin/xOPS-App</a>
                </p>
            </div>
        </>
    )
}