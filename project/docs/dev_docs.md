# FIT - Aplikacja Fit Helper do wspierania zdrowego stylu życia
### Wydział Fizyki i Informatyki Stosowanej - Inżynieria Oprogramowania
### Skład zespołu:
1. Piotr Kumala (team-leader)
1. Patryk Chodur
1. Leszek Lorens
1. Maciej Domagalski
1. Tomasz Praszkiewicz
1. Dawid Górka



## Dokumentacja deweloperska

### Rozwiązania zastosowane w aplikacji:
1. Część backendowa jest napisana we frameworku express do node.js
1. Na serwerze zaimplementowana jest autoryzacja opierająca się na szyfrowanych jsw (json web token)
1. Serwer jest udostępniany w chmurze, aby użytkownicy nie musieli zajmować się instalacją i utrzymaniem serwera
1. Na serwerze udostępnione jest REST'owe API, nie trzyma się ona w pełni REST'a, jest to nasza własna interpretacja standartu REST
1. Baza danych jest zrealizowana w POSTGRESQL i w wystawiona w chmurze ELEPHANTSQL
1. Aplikacja mobilna jest napisana w ReactNative.
1. Wszystkie komponenty w aplikacji są funkcyjne i stosują technologię ReactHooks do przechowywania stanu komponentu.
1. Po zalogowaniu użytkownika w aplikacji token jest zapisywany w stanie aplikacji, ponieważ każdy request do serwera powinien zawierać token w celu poprawnej autoryzacji requesta.
1. W aplikacji mobilnej szeroko wykorzysywana jest biblioteka react-native-components oraz react-native-chart-kit do tworzenia wykresów.

### Pomysły ulepszeń:
1. W planerze posiłków możnać dodać możliwość wybierania zakresu dat, z których powinny być wyświetlane posiłki.
1. W planerze posiłków można dodać wykresy lepiej prezentujące dane analityczne.
1. Do modułu notatek można dodać możliwość usuwania utworzonych notatek.
1. Do aplikacji można dodać komponent zapomniałem hasła - w tym momencie trzeba się kontaktować z administratorem systemu.
1. Możliwość dodawania przepisów i posiłków opartych na tych przepisach.
1. Można dodać moduł określania celów i statystyk postępów w osiąganiu celu.
   
